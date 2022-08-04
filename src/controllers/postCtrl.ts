import Posts from '../models/postModel'
import { Response } from 'express'
import { IPost } from '../types'
import { fileSizeFormatter } from '../utils'

const postCtrl = {
    createPost: async (req: IPost, res: Response) => {
        try {

            const imageArray = []
            const fileArray: any = req.files
            if(fileArray.length > 0) {
                fileArray.forEach((element: any) => {
                    const file = {
                        fileName: element.originalname,
                        filePath: element.path,
                        fileType: element.mimetype,
                        fileSize: fileSizeFormatter(element.size, 2)
                    }
                    imageArray.push(file)
                })
            }
            // check the number of images
            if(imageArray.length > 4) return res.status(400).json({msg: "You can only upload up to 4 images."})

            // Description is an array of objects. Each object has a key and text.
            const descriptionArray = []
            const keyReqBody = req.body.key
            const textReqBody = req.body.text
            // keyReqBody is an array of strings.
            if(Array.isArray(keyReqBody)) {
                keyReqBody.forEach((key: string, index: number) => {
                    const keys = key
                    descriptionArray.push({
                        key: keys,
                    })
                })
            } else {
                descriptionArray.push({
                    key: keyReqBody,
                })
            }
            // text is an array of objects. Each object has a key and text.
            if(Array.isArray(textReqBody)) {
                textReqBody.forEach((text: string, index: number) => {
                    const texts = text
                    descriptionArray[index].text = texts
                })
            } else {
                descriptionArray[0].text = textReqBody
            }

            // newPost is an object with all the properties of the post.
            const newPost: any = new Posts({
                description: descriptionArray,
                images: imageArray,
                status: req.body.status,
                user: req.body.user
            })
            // save the new post to the database.
            await newPost.save();
            // return the new post to the client.
            res.json({
                msg: 'Created Post!',
                newPost: {
                    ...newPost._doc,
                    user: req.user
                }
            })
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    }
}

export default postCtrl