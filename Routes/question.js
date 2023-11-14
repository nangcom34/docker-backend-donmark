const express = require('express')
const { list, read, create, update, remove,listby } = require('../Controllers/question')

const router = express.Router()





//http://localhost:5000/api/product
router.get('/question', list)
router.post('/questionby', listby)


router.get('/question/:id', read)
router.post('/question',  create)
router.put('/question/:id', update)
router.delete('/question/:id', remove)






module.exports = router