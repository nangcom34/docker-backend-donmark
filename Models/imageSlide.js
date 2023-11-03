const mongoose = require('mongoose')

const imageSlide = mongoose.Schema({
    file: String,
    urlname: {
        type: String,
    }

}, { timestamps: true })

module.exports = mongoose.model('imageSlide', imageSlide)