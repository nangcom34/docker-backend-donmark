const ImageProduct = require('../Models/imageProduct')
const fs = require('fs')

exports.read = async (req, res) => {
    try {
        // code
        const id = req.params.id
        const ImageProducted = await ImageProduct.findOne({ _id: id }).exec();
        res.send(ImageProducted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.list = async (req, res) => {
    try {
        // code
        const ImageProducted = await ImageProduct.find().exec();
        res.send(ImageProducted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.listby = async (req, res) => {
    try {
        // code
        const { limit, sort, order } = req.body

        const ImageProducted = await ImageProduct.find({})
            .limit(limit)
            .sort([[sort, order]])
            .exec();
        res.send(ImageProducted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.listbySale = async (req, res) => {
    try {
        // code
        const { limit, sort, order } = req.body

        const producted = await ImageProduct.find({ sale: true })
            .limit(limit)
            .sort([[sort, order]])
            .exec();
        res.send(producted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.listbyNew = async (req, res) => {
    try {
        // code
        const { limit, sort, order } = req.body

        const producted = await ImageProduct.find({ sale: false })
            .limit(limit)
            .sort([[sort, order]])
            .exec();
        res.send(producted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.create = async (req, res) => {
    try {
        // code
        console.log(req.body)
        console.log(req.file)
        var data = req.body
        if (req.file) {
            data.file = req.file.filename
        }
        console.log(data)
        const ImageProducted = await ImageProduct(data).save()
        res.send(ImageProducted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.update = async (req, res) => {
    try {
        // code
        const id = req.params.id
        var newData = req.body
        console.log(newData)
        console.log(req.file)
        if (typeof req.file !== 'undefined') {
            newData.file = req.file.filename
            await fs.unlink('./uploads/' + newData.fileOld, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Edit success')
                }
            })
        }
        const updated = await ImageProduct
            .findOneAndUpdate({ _id: id }, newData, { new: true })
            .exec()
        res.send(updated)

    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.remove = async (req, res) => {
    try {
        // code
        const id = req.params.id
        const removed = await ImageProduct.findOneAndDelete({ _id: id }).exec()
        if (removed?.file) {
            await fs.unlink('./uploads/' + removed.file, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Remove success')
                }
            })
        }

        res.send(removed)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.changeSale = async (req, res) => {
    try {
        console.log(req.body)
        const saled = await ImageProduct.findOneAndUpdate({ _id: req.body.id }, { sale: req.body.sale })
        res.send(saled)

    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error!`)
    }
}