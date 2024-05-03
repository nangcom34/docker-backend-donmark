const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = mongoose.Schema({
    name: {
        type: String,
        text: true,
    },
    description: String,
    brand: String,
    type: String,
    material: String,
    model: String,
    wide: String,
    long: String,
    high: String,
    weight: String,
    barcode: String,
    productCode: String,
    files: Array,
    category: {
        type: ObjectId,
        ref: "category"
    },
    subCategory: {
        type: ObjectId,
        ref: "subCategory"
    },
    subSubCategory: {
        type: ObjectId,
        ref: "subSubCategory"
    },
    recommend: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true })

productSchema.index({ name: "text", "category.name": 1 });

module.exports = mongoose.model('products', productSchema)