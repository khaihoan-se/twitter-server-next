import { IUser } from './../types/index';
import { Request, Response } from 'express'
import Users from '../models/userModel'
import bcrypt from 'bcrypt'
import { validateEmail, validatePassword, createAccessToken, createRefreshToken } from '../utils'
import { generateFromEmail } from 'unique-username-generator'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || '';

const authCtrl = {
    register: async (req: Request, res: Response) => {
        try {
            const { fullname, username, email, password } = req.body
            if (!fullname || !email || !password) return res.status(400).json({ message: 'Please fill all fields' })

            if(!validateEmail(email)) return res.status(400).json({message: 'Invalid emails.'})
            const user_email = await Users.findOne({email})
            if(user_email) return res.status(400).json({message: 'This email already exists.'})

            
            const newUserName = !username ? generateFromEmail(email, 3) : username.toLowerCase().replace(/ /g, '')
            const user_name = await Users.findOne({username: newUserName})
            if(user_name) return res.status(400).json({message: 'This user name already exists.'})

            if(!validatePassword(password)) return res.status(400).json({message: 'Minimum of eight characters, at least one uppercase, one lowercase and one special character.'})
            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new Users({
                fullname, username: newUserName, email, password: passwordHash
            })

            const access_token = createAccessToken({id: newUser._id})
            const refresh_token = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000 // 30days
            })

            await newUser.save()

            res.json({
                message: 'Register Success!',
                access_token,
                // user: {
                //     newUser,
                //     password: ''
                // }
            })

        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({email})
                .populate("followers following", "avatar username fullname followers following")
            
            if(!user) return res.status(400).json({msg: "This email does not exist."})
    
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Wrong password."})
    
            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})
    
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000 // 30days
            })
    
            res.json({
                message: 'Login Success!',
                access_token,
                data: {
                    user,
                    password: ''
                }
            })
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req: Request, res: Response) => {
        try {
            res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
            return res.json({msg: "Logged out!"})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
    generateAccessToken: async (req: Request, res: Response) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now."})

            jwt.verify(rf_token, REFRESH_TOKEN_SECRET, async(err: any, result: any) => {
                if(err) return res.status(400).json({msg: "Please login now."})

                const user = await Users.findById(result.id).select("-password")
                .populate('followers following', 'avatar username fullname followers following')

                if(!user) return res.status(400).json({msg: "This does not exist."})

                const access_token = createAccessToken({id: result.id})

                res.json({
                    access_token,
                    user
                })
            })
            
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    }
}

export default authCtrl