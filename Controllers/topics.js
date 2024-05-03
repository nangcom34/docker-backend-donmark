const Topics = require('../Models/topics')
const fs = require('fs')

exports.read = async (req, res) => {
    try {
        // code
        const id = req.params.id
        const Topiced = await Topics.findOne({ _id: id }).exec();
        res.send(Topiced)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.list = async (req, res) => {
    try {
        // code
        const Topiced = await Topics.find().exec();
        res.send(Topiced)
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

        const Topiced = await Topics.find()
            .limit(limit)
            .sort([[sort, order]])
            .exec();


        res.send(Topiced);
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
            data.thumb = req.file.filename
        }
        console.log(data)
        const Topiced = await Topics(data).save()
        res.send(Topiced)
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
            newData.thumb = req.file.filename
            await fs.unlink('./uploads/' + newData.fileOld, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Edit success')
                }
            })
        }
        const updated = await Topics
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
        const removed = await Topics.findOneAndDelete({ _id: id }).exec()
        if (removed?.thumb) {
            await fs.unlink('./uploads/' + removed.thumb, (err) => {
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


exports.changeView = async (req, res) => {
    try {
        console.log("Body", req.body)
        const { id } = req.body
        const viewed = await Topics.findOneAndUpdate({ _id: id }, { $inc: { countView: 1 } });
        res.send(viewed)

    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error!`)
    }
}

