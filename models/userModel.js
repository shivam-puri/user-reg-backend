import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
    password: {
        type: String,
        required: true,
        minlength: 10
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 120,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    about: {
        type: String,
        trim: true,
        maxLength: 5000
    },
    role: {
        type: String,
        default: 'user'
    }

}, { timestamps: true })

export default mongoose.model('users', userSchema)