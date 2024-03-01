const express = require('express')
const { list, read, create, update, remove,listby } = require('../Controllers/category')

const router = express.Router()





//http://localhost:5000/api/product
router.get('/category', list)
router.post('/categoryby', listby)



router.get('/category/:id', read)
router.post('/category',  create)
router.put('/category/:id', update)
router.delete('/category/:id', remove)






module.exports = router