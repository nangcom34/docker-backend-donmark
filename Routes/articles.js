const express = require('express')
const { list, read, create, update, remove,listby } = require('../Controllers/articles')
const { upArticles } = require('../Middleware/upload')
const router = express.Router()





//http://localhost:5000/api/topics
router.get('/articles', list)
router.post('/articlesby', listby)

router.get('/articles/:id', read)
router.post('/articles', upArticles, create)
router.put('/articles/:id', upArticles, update)
router.delete('/articles/:id', remove)






module.exports = router