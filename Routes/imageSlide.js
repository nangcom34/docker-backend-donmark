const express = require('express')
const { list, read, create, update, remove, } = require('../Controllers/imageSlide')
const { upload } = require('../Middleware/upload')
const router = express.Router()





//http://localhost:5000/api/product
router.get('/imageSlide', list)

router.get('/imageSlide/:id', read)
router.post('/imageSlide', upload, create)
router.put('/imageSlide/:id', upload, update)
router.delete('/imageSlide/:id', remove)


module.exports = router