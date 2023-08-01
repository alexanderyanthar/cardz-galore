const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
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
    rarity: [String],
})

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;