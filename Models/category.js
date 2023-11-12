const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        text: true,
    }
   
    
}, { timestamps: true })

categorySchema.index({ name: "text" });

module.exports = mongoose.model('category', categorySchema)