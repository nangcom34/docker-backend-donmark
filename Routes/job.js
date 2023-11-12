const express = require('express')
const { list, read, create, update, remove,listby } = require('../Controllers/job')

const router = express.Router()





//http://localhost:5000/api/product
router.get('/job', list)
router.post('/jobby', listby)


router.get('/job/:id', read)
router.post('/job',  create)
router.put('/job/:id', update)
router.delete('/job/:id', remove)






module.exports = router