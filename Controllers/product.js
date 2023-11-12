const Product = require('../Models/product')
const fs = require('fs')

exports.read = async (req, res) => {
    try {
        // code
        const id = req.params.id
        const producted = await Product.findOne({ _id: id }).exec();
        res.send(producted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.list = async (req, res) => {
    try {
        // code
        const producted = await Product.find().populate("category").exec();
        res.send(producted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}


exports.listby = async (req, res) => {
    try {
        console.log(req.body);
        const { limit, sort, order, query } = req.body.filters;

        let producted;

        if (!query) {
            producted = await Product.find()
                .limit(limit)
                .sort([[sort, order]])
                .populate("category")
                .exec();
        } else {
            let textSearch = await Product.find({ $text: { $search: `*${query}*` } }).limit(limit).sort([[sort, order]]).populate("category").exec();
            let regexSearch = await Product.find({ "category.name": { $regex: `.*${query}.*`, $options: 'i' } }).limit(limit).sort([[sort, order]]).populate("category").exec();

            producted = textSearch.concat(regexSearch);
        }

        res.send(producted);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};



// exports.listby = async (req, res) => {
//     try {
//         console.log(req.body)
//         const { limit, sort, order, query } = req.body.filters


//         let producted;

//         if (query === "" || !query) {
//             // หาก query เป็นข้อความว่าง
//             producted = await Product.find()
//                 .limit(limit)
//                 .sort([[sort, order]])
//                 .populate("category")
//                 .exec();
//         } else {
//             // หาก query มีค่า
//             producted = await Product.find({ $text: { $search: `*${query}*` } })
//                 .limit(limit)
//                 .sort([[sort, order]])
//                 .populate("category")
//                 .exec();
//         }

//         res.send(producted);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('Server Error');
//     }
// }


exports.listbyRecommend = async (req, res) => {
    try {
        // code
        const { limit, sort, order } = req.body

        const producted = await Product.find({ recommend: true })
            .populate("category")
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
        const producted = await Product(data).save()
        res.send(producted)
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
        const updated = await Product
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
        const removed = await Product.findOneAndDelete({ _id: id }).exec()
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

exports.changeRecommend = async (req, res) => {
    try {
        console.log(req.body)
        const recommended = await Product.findOneAndUpdate({ _id: req.body.id }, { recommend: req.body.recommend })
        res.send(recommended)

    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error!`)
    }
}

