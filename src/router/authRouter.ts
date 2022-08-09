import express from 'express';
import authCtrl from '../controllers/authCtrl'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/register', authCtrl.register)

router.post('/login', authCtrl.login)

router.get('/info', auth, authCtrl.getUserInfor)

router.post('/logout', authCtrl.logout)

router.post('/refresh_token', authCtrl.generateAccessToken)


export default router