const mongoose = require('mongoose')

const catalogSchema = mongoose.Schema({
    file: String,
    



}, { timestamps: true })

module.exports = mongoose.model('catalog', catalogSchema)