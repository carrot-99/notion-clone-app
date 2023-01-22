const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    icon: {
        type: String,
        default: "🥕",
    },
    title: {
        type: String,
        default: "ただのメモ",
    },
    description: {
        type: String,
        default: "ここにメモ",
    },
    position: {
        type: Number,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    favoritePosition: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model("Memo", memoSchema); 