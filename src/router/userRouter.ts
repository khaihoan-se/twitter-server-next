import express from 'express';
import auth from '../middleware/auth';
import userCtrl from '../controllers/userCtrl';

const router = express.Router();

router.get('/search', auth, userCtrl.searchUser) // search user
router.get('/user/:id', auth, userCtrl.getUser) // get user by id
router.patch('/user', auth, userCtrl.updateUser) // update user


export default router;