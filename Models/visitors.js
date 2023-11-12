const mongoose = require('mongoose')

const visitors = mongoose.Schema({
    visitors: {
        type: Number,
        default:0
    }
    

}, { timestamps: true })

module.exports = mongoose.model('visitors', visitors)