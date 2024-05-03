const express = require('express')
const { list, read, create, update, remove,listby, listbyCat } = require('../Controllers/subCategory')

const router = express.Router()





//http://localhost:5000/api/subCategories
router.get('/subCategory', list)
router.post('/subCategoryby', listby)
router.post('/subCategorybyCat', listbyCat);


router.get('/subCategory/:id', read)
router.post('/subCategory',  create)
router.put('/subCategory/:id', update)
router.delete('/subCategory/:id', remove)






module.exports = router