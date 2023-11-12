const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = mongoose.Schema({
    name: {
        type: String,
        text: true,
    },
    description: String,
    file: String,
    category: {
        type: ObjectId,
        ref: "category"
    },
    recommend: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true })

productSchema.index({ name: "text", "category.name": 1 });

module.exports = mongoose.model('products', productSchema)