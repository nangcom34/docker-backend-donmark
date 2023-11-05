const mongoose = require('mongoose')

const homepageSchema = mongoose.Schema({

    description: String,
    file: String,
    top: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true })


module.exports = mongoose.model('homepages', homepageSchema)