const express = require('express')
const { list, read, create, update, remove, listby, listbySale,changeSale, listbyNew } = require('../Controllers/imageProduct')
const { upload } = require('../Middleware/upload')
const router = express.Router()





//http://localhost:5000/api/product
router.get('/imageProduct', list)
router.post('/imageProductby', listby)
router.post('/imageProductsale', listbySale)
router.post('/imageProductnew', listbyNew)


router.get('/imageProduct/:id', read)
router.post('/imageProduct', upload, create)
router.put('/imageProduct/:id', upload, update)
router.delete('/imageProduct/:id', remove)

router.post('/change-sale', changeSale)




module.exports = router