const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const subSubCategoriesSchema = mongoose.Schema({
    name: {
        type: String,
        text: true,
    },
    subCategory: {
        type: ObjectId,
        ref: "subCategory"
    },
   
    
}, { timestamps: true })

subSubCategoriesSchema.index({ name: "text" });

module.exports = mongoose.model('subSubCategory', subSubCategoriesSchema)