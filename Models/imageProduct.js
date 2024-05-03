const mongoose = require('mongoose')

const imageProductSchema = mongoose.Schema({
    file: String,
    sale: {
        type: Boolean,
        default: false,
    },
    urlname: {
        type: String,
        default: "https://donmarkthai.com",
    }

}, { timestamps: true })

module.exports = mongoose.model('imageProduct', imageProductSchema)