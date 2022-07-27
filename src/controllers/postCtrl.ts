import Posts from '../models/postModel'
import { Response } from 'express'
import { IPost } from '../types'

const postCtrl = {
    createPost: async (req: IPost, res: Response) => {
        const { description, images, status } = req.body

        if(images.length > 4) return res.status(400).json({msg: "You can only upload up to 4 images."})

        const newPost: any = new Posts({ description, images, status, user: req.user._id })

        await newPost.save()

        res.json({
            msg: 'Created Post!',
            newPost: {
                ...newPost._doc,
                user: req.user
            }
        })
    }
}

export default postCtrl