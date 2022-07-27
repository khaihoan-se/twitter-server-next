import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    description: {
        type: Array,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        default: '1' // 1: Everyone can reply, 2: People you follow, 3: Only people you mention can reply
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    user: {type: mongoose.Types.ObjectId, ref: 'user'}
}, {
    timestamps: true
})

export default mongoose.model('post', postSchema)
