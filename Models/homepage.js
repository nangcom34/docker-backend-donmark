const mongoose = require('mongoose')

const homepageSchema = mongoose.Schema({

    description: String,
    name: String,
    file: String,
    top: {
        type: Boolean,
        default: false,
    },
    countView: {
        type: Number,
        default: 0,
    }

}, { timestamps: true })


module.exports = mongoose.model('homepages', homepageSchema)