const express = require('express')
const { list, read, create, update, remove, listby, listbyRecommend, listByCat, changeRecommend, listByRecommendCat, getOne } = require('../Controllers/product')
const { upProducts } = require('../Middleware/upload')
const router = express.Router()





//http://localhost:5000/api/product
router.get('/product', list)
router.post('/productby', listby)
router.post('/productbyCat', listByCat)
router.post('/productrecommend', listbyRecommend)
router.post('/productbyrecommendCat', listByRecommendCat)


router.get('/product/:id', read)
router.post('/productone', getOne)
router.post('/product', upProducts, create)
router.put('/product/:id', upProducts, update)
router.delete('/product/:id', remove)

router.post('/change-recommend', changeRecommend)






module.exports = router