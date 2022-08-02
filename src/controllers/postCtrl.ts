import Posts from '../models/postModel'
import { Response, Request, NextFunction } from 'express'
import { IPost } from '../types'
// import imageModel from '../models/imageModel'
import { fileSizeFormatter } from '../utils'

const postCtrl = {
    createPost: async (req: IPost, res: Response) => {
        const imageArray = []
        const fileArray: any = req.files
        fileArray.forEach((element: any) => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            imageArray.push(file)
        })
        if(imageArray.length > 4) return res.status(400).json({msg: "You can only upload up to 4 images."})
        
        const newPost: any = new Posts({
            description: req.body.description,
            images: imageArray,
            status: req.body.status,
            likes: [],
            comments: [],
            user: req.body.user
        })
        // console.log(req.body)
        await newPost.save();

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