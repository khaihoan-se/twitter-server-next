import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true, trim: true, maxlength: 50 },
    username: { type: String, required: true, trim: true,  maxlength: 50, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'http://localhost:5000/images/fallback_profile.png' },
    banner: { type: String, required: false },
    birthday: { type: Date },
    bio: { type: String, maxlength: 160 },
    location: { type: String, maxlength: 25 },
    website: { type: String, maxlength: 25 },
    statusPost: { type: String, default: '1' },
    followers: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    saved: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    posts: [{ type: mongoose.Types.ObjectId, ref: 'post' }],
    postLike: [{ type: mongoose.Types.ObjectId, ref: 'post' }]
})

userSchema.plugin(uniqueValidator)

export default mongoose.model('user', userSchema)
