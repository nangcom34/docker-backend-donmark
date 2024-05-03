const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, 'singleUpload-' + Date.now()+ file.originalname)
    }
})

exports.upload = multer({ storage: storage }).single('file')

const storageCatalog = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, 'catalog-' + Date.now()+ file.originalname)
    }
})

exports.upCatalog = multer({ storage: storageCatalog }).single('file')

const storageProducts = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, 'product-' + Date.now()+ file.originalname)
    }
})

exports.upProducts = multer({ storage: storageProducts }).array('files')

const storageArticles = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, 'blog-' + Date.now()+ file.originalname)
    }
})

exports.upArticles = multer({ storage: storageArticles }).array('files')