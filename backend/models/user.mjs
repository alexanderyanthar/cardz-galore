import mongoose from 'mongoose';

export const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: "user",
    },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
}));