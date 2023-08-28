import mongoose from "mongoose";

export const Cart = mongoose.model('Cart', new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
    setId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card.sets'},
    quantity: { type: Number, default: 1 }, 
}));