import dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import authRouter from './router/authRouter'
import postRouter from './router/postRouter'
import userRouter from './router/userRouter'

dotenv.config()

const app: Application = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
app.use(cors({
  //To allow requests from client
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://104.142.122.231",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(express.static('public'))
app.use('/images', express.static('images'))
app.use('/uploads', express.static('uploads'));

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
app.use('/api', userRouter)


app.listen(POST, () => {
  console.log('Server is running on port 5000')
})
