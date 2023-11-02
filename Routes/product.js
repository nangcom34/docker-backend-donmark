const express = require('express')
const { list, read, create, update, remove, listby, listbyRecommend,changeRecommend } = require('../Controllers/product')
const { upload } = require('../Middleware/upload')
const router = express.Router()





//http://localhost:5000/api/product
router.get('/product', list)
router.post('/productby', listby)
router.post('/productrecommend', listbyRecommend)


router.get('/product/:id', read)
router.post('/product', upload, create)
router.put('/product/:id', upload, update)
router.delete('/product/:id', remove)

router.post('/change-recommend', changeRecommend)






module.exports = router