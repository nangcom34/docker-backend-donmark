const mongoose = require('mongoose')

const imageProductSchema = mongoose.Schema({
    file: String,
    sale: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true })

module.exports = mongoose.model('imageProduct', imageProductSchema)