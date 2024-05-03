const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const subCategoriesSchema = mongoose.Schema({
    name: {
        type: String,
        text: true,
    },
    category: {
        type: ObjectId,
        ref: "category"
    },
   
    
}, { timestamps: true })

subCategoriesSchema.index({ name: "text" });

module.exports = mongoose.model('subCategory', subCategoriesSchema)