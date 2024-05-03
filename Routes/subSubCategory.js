const express = require('express')
const { list, read, create, update, remove,listby,listbySubCat } = require('../Controllers/subSubCategory')

const router = express.Router()





//http://localhost:5000/api/subSubCategory
router.get('/subSubCategory', list)
router.post('/subSubCategoryby', listby)
router.post('/subSubCategorybyCat', listbySubCat)



router.get('/subSubCategory/:id', read)
router.post('/subSubCategory',  create)
router.put('/subSubCategory/:id', update)
router.delete('/subSubCategory/:id', remove)






module.exports = router