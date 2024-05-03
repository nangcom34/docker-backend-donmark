const mongoose = require('mongoose')

const topicsSchema = mongoose.Schema({

    title: String,
    thumb: String,
    countView: {
        type: Number,
        default: 0,
    }

}, { timestamps: true })


module.exports = mongoose.model('topics', topicsSchema)