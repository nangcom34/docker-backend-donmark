const express = require('express')
const { list, read, create, update, remove,changeVisitors } = require('../Controllers/visitors')
const router = express.Router()





//http://localhost:5000/api/product
router.get('/visitors', list)

router.get('/visitors/:id', read)
router.post('/visitors',  create)
router.put('/visitors/:id',  update)
router.delete('/visitors/:id', remove)
router.post('/change-visitors',  changeVisitors)



module.exports = router