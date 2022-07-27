import { Request, Response } from 'express'
import Users from '../models/userModel'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { IPost, IUser } from '../types'

dotenv.config()
const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || '';

const auth = async (req: IPost, res: Response, next: any) => {
    try {
        const token = req.header("Authorization")

        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        const decoded: any = jwt.verify(token, ACCESS_TOKEN_SECRET)
        if(!decoded) return res.status(400).json({msg: "Invalid Authentication."})

        const user: IUser = await Users.findOne({_id: decoded.id})
        
        req.user = user
        next()
    } catch (err: any) {
        return res.status(500).json({msg: err.message})
    }
}

export default auth