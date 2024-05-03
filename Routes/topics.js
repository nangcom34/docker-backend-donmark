const express = require('express')
const { list, read, create, update, remove,changeView,listby } = require('../Controllers/topics')
const { upload } = require('../Middleware/upload')
const router = express.Router()





//http://localhost:5000/api/topics
router.get('/topics', list)
router.post('/topicsby', listby)

router.get('/topics/:id', read)
router.post('/topics', upload, create)
router.put('/topics/:id', upload, update)
router.delete('/topics/:id', remove)


router.post('/change-view-topic', changeView)




module.exports = router