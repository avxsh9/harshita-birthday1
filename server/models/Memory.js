const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL or path
        required: true
    },
    description: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Memory', MemorySchema);
