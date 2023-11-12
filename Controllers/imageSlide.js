const ImageSlide = require('../Models/imageSlide')
const fs = require('fs')

exports.read = async (req, res) => {
    try {
        // code
        const id = req.params.id
        const ImageSlided = await ImageSlide.findOne({ _id: id }).exec();
        res.send(ImageSlided)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.list = async (req, res) => {
    try {
        // code
        const ImageSlided = await ImageSlide.find().exec();
        res.send(ImageSlided)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.listby = async (req, res) => {
    try {
        console.log(req.body)
        const { limit, sort, order } = req.body

       const ImageSlided = await ImageSlide.find()
            .limit(limit)
            .sort([[sort, order]])
            .exec();


        res.send(ImageSlided);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
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
        const ImageSlided = await ImageSlide(data).save()
        res.send(ImageSlided)
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
        const updated = await ImageSlide
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
        const removed = await ImageSlide.findOneAndDelete({ _id: id }).exec()
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
