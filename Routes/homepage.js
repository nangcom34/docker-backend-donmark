const express = require('express')
const { list, read, create, update, remove,listbyToptrue, listbyTopfalse,changeView,listby } = require('../Controllers/homepage')
const { upload } = require('../Middleware/upload')
const router = express.Router()





//http://localhost:5000/api/product
router.get('/homepage', list)
router.post('/homepageby', listby)

router.get('/homepage/:id', read)
router.post('/homepage', upload, create)
router.put('/homepage/:id', upload, update)
router.delete('/homepage/:id', remove)


router.post('/change-view', changeView)




module.exports = router