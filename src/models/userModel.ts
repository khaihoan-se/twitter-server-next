import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'http://localhost:5000/images/fallback_profile.png'
    },
    banner: {
        type: String,
    },
    birthday: { 
        type: Date 
    },
    bio: {
        type: String,
        default: '',
        maxlength: 160
    },
    location: {
        type: String,
        maxlength: 25
    },
    website: {
        type: String,
        maxlength: 25
    },
    statusPost: {
        type: String,
        default: '1'
    },
    followers: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    following: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    saved: [{type: mongoose.Types.ObjectId, ref: 'user'}]
}, {
    timestamps: true
})

export default mongoose.model('user', userSchema)
