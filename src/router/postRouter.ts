import express from 'express'
import auth from '../middleware/auth'
import postCtrl from '../controllers/postCtrl'

const router = express.Router()

router.post('/create-post', auth, postCtrl.createPost)

export default router