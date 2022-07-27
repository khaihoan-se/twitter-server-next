import dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import authRouter from './router/authRouter'
import postRouter from './router/postRouter'
dotenv.config()

const app: Application = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(express.static('public'))
app.use('/images', express.static('images'))

const POST = process.env.PORT || 5000;
const URI = process.env.MONGODB_URL || '';

(async () => {
  try {
    await mongoose.connect(URI);
    console.log('Connected To MongoDB!!!');
  } catch (error) {
    console.error(error);
  }
})()

app.use('/api', authRouter)
app.use('/api', postRouter)


app.listen(POST, () => {
  console.log('Server is running on port 5000')
})
