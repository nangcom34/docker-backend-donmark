const Homepage = require('../Models/homepage')
const fs = require('fs')

exports.read = async (req, res) => {
    try {
        // code
        const id = req.params.id
        const homepaged = await Homepage.findOne({ _id: id }).exec();
        res.send(homepaged)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.list = async (req, res) => {
    try {
        // code
        const homepaged = await Homepage.find().exec();
        res.send(homepaged)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}




exports.listbyToptrue = async (req, res) => {
    try {
        // code
        const homepaged = await Homepage.find({ top: true })
            .exec();
        res.send(homepaged)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.listbyTopfalse = async (req, res) => {
    try {
        // code
        const homepaged = await Homepage.find({ top: false })
            .exec();
        res.send(homepaged)
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
        const homepaged = await Homepage(data).save()
        res.send(homepaged)
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
        const updated = await Homepage
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
        const removed = await Homepage.findOneAndDelete({ _id: id }).exec()
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

exports.changeTop = async (req, res) => {
    try {
        console.log(req.body)
        const toped = await Homepage.findOneAndUpdate({ _id: req.body.id }, { top: req.body.top })
        res.send(toped)

    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error!`)
    }
}

