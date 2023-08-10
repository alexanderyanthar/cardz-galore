import mongoose from "mongoose";

export const Card = mongoose.model('Card', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    attribute: String,
    level: Number,
    atk: Number,
    def: Number,
    quantity: {
        type: Number,
        default: 0
    },
    rarity: {
        type: [String],
        required: true,
    },
    images: {
        type: [String],
        required: true
    }
}))
