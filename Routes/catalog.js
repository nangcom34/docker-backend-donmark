const express = require('express')
const { list, read, create, update, remove, listby } = require('../Controllers/catalog')
const { upCatalog } = require('../Middleware/upCatalog')
const router = express.Router()





//http://localhost:5000/api/catalog
router.get('/catalog', list)
router.post('/catalogby', listby)

router.get('/catalog/:id', read)
router.post('/catalog',upCatalog, create)
router.put('/catalog/:id', upCatalog, update)
router.delete('/catalog/:id', remove)






module.exports = router