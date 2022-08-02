import express from 'express'
import auth from '../middleware/auth'
import postCtrl from '../controllers/postCtrl'
import upload from '../middleware/upload'

const router = express.Router()

router.post('/create-post', upload.array('images'), auth, postCtrl.createPost)

export default router