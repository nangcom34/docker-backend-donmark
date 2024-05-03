const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const articlesSchema = mongoose.Schema({
    title: String,
    images: Array,
    description: String,
    topics: {
        type: ObjectId,
        ref: "topics"
    },
   
    
}, { timestamps: true })


module.exports = mongoose.model('articles', articlesSchema)