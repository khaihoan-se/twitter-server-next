import mongoose from 'mongoose'

const descriptionSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

export default mongoose.model('post', descriptionSchema)

