import { Request, Response } from 'express';
import Users from '../models/userModel'
import { IPost } from '../types'

const userCtrl = {
    searchUser: async (req: Request, res: Response) => {
        try {
            const users = await Users.find({username: {$regex: req.query.username}})
            .limit(10).select("fullname username avatar")
            
            res.json({users})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUser: async (req: Request, res: Response) => {
        try {
            const user = await Users.findById(req.params.id).select('-password')
            .populate("followers following", "-password")
            if(!user) return res.status(400).json({msg: "User does not exist."})
            
            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req: IPost, res: Response) => {
        try {
            const { fullname, username, avatar, banner, birthday, website, statusPost, bio, location } = req.body

            // if(!fullname) return res.status(400).json({msg: "Please add your full name."})

            const newUserName = !username ? username : username.toLowerCase().replace(/ /g, '')
            const user_name = await Users.findOne({username: newUserName})
            if(user_name && user_name === username) return res.status(400).json({message: 'This user name already exists.'})

            await Users.findOneAndUpdate({_id: req.user._id}, {
                fullname, username: newUserName, avatar, banner, birthday, website, statusPost, bio, location
            })

            res.json({msg: "Update Success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    follow: async (req: any, res: Response) => {
        try {
            const user = await Users.find({_id: req.params.id, followers: req.user._id})
            if(user.length > 0) return res.status(500).json({msg: "You followed this user."})

            const newUser = await Users.findOneAndUpdate({_id: req.params.id}, { 
                $push: {followers: req.user._id}
            }, {new: true}).populate("followers following", "-password")

            await Users.findOneAndUpdate({_id: req.user._id}, {
                $push: {following: req.params.id}
            }, {new: true})

            res.json({newUser})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    unfollow: async (req: any, res: Response) => {
        try {

            const newUser = await Users.findOneAndUpdate({_id: req.params.id}, { 
                $pull: {followers: req.user._id}
            }, {new: true}).populate("followers following", "-password")

            await Users.findOneAndUpdate({_id: req.user._id}, {
                $pull: {following: req.params.id}
            }, {new: true})

            res.json({newUser})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    suggestionsUser: async (req : any, res: Response) => {
        try {
            const newArr = [...req.user.following, req.user._id]

            const num  = req.query.num || 10

            const users = await Users.aggregate([
                { $match: { _id: { $nin: newArr } } },
                { $sample: { size: Number(num) } },
                { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followers' } },
                { $lookup: { from: 'users', localField: 'following', foreignField: '_id', as: 'following' } },
            ])

            return res.json({
                users,
                result: users.length
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

export default userCtrl