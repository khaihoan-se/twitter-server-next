import express from 'express'
import auth from '../middleware/auth'
import postCtrl from '../controllers/postCtrl'
import upload from '../middleware/upload'

const router = express.Router()
// @route   POST api/create-post
router.post('/create-post', upload.array('images'), auth, postCtrl.createPost)
// @route   GET api/get-posts
router.get('/get-posts', auth, postCtrl.getPosts)

export default router