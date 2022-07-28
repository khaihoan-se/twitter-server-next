import express from 'express';
import auth from '../middleware/auth';
import userCtrl from '../controllers/userCtrl';

const router = express.Router();

router.get('/search', auth, userCtrl.searchUser) // search user

router.get('/user/:id', auth, userCtrl.getUser) // get user by id

router.patch('/user', auth, userCtrl.updateUser) // update user

router.patch('/user/:id/follow', auth, userCtrl.follow) // follow user
router.patch('/user/:id/unfollow', auth, userCtrl.unfollow) // unfollow user

router.get('/suggestionsUser', auth, userCtrl.suggestionsUser)  // get suggestions user


export default router;