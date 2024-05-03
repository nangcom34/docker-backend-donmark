const Articles = require('../Models/articles')
const fs = require('fs');
const topics = require('../Models/topics');

exports.read = async (req, res) => {
    try {
        // code
        const id = req.params.id
        const articled = await Articles.findOne({ _id: id }).exec();
        res.send(articled)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.list = async (req, res) => {
    try {
        // code
        const articled = await Articles.find().populate("topics").exec();
        res.send(articled)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}


exports.listby = async (req, res) => {
    try {
        console.log(req.body);
        const { limit, sort, order, id } = req.body;

        let articled = await Articles.find({ topics: id })
            .limit(limit)
            .sort([[sort, order]])
            .populate("topics")
            .exec();


        res.send(articled);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};




exports.create = async (req, res) => {
    try {
        // code

        console.log("req.files", req.files)
        var data = req.body
        console.log("req.body", req.body.data)
        if (req.files) {
            data.images = req.files.map(file => file.filename)
        }
        const articled = await Articles(data).save()
        res.send(articled)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        let newData = req.body;
        console.log("newData", newData);
        console.log("req.files", req.files);

        //เช็คและแปลง string เป็น array
        if (typeof newData.images === 'string') {
            newData.images = [newData.images]
        }
        if (typeof newData.fileOld === 'string') {
            newData.fileOld = [newData.fileOld]
        }

        if (req.files && req.files.length > 0) {
            const fileNames = req.files.map(file => file.filename);
            newData.images = fileNames;
            // หากมีการอัพโหลดไฟล์ใหม่ ลบไฟล์เก่าออกจาก uploads directory
            if (newData.fileOld && newData.fileOld.length > 0) {
                await Promise.all(newData.fileOld.map(async oldFileName => {
                    try {
                        await fs.unlink('./uploads/' + oldFileName, (err) => {
                            if (err) {
                                console.error('Error deleting file:', oldFileName, err);
                            } else {
                                console.log('Deleted file:', oldFileName, 'success');
                            }
                        });
                    } catch (err) {
                        console.error('Error deleting file:', oldFileName, err);
                    }
                }));
            }
        }
        console.log("newData.images",newData.images);
        // ลบ property fileOld ออกเนื่องจากไม่ได้ใช้อีกต่อไป
        delete newData.fileOld;
        delete newData.files;

        // อัปเดตข้อมูลใหม่ลงในฐานข้อมูล
        const updated = await Articles.findOneAndUpdate({ _id: id }, newData, { new: true });

        res.send(updated);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
exports.remove = async (req, res) => {
    try {
        // code
        const id = req.params.id
        const articled = await Articles.findById(id);

        if (!articled) {
            return res.status(404).send('Article not found');
        }

        if (articled.images && articled.images.length > 0) {
            await Promise.all(articled.images.map(async fileName => {
                try {
                    await fs.unlink('./uploads/' + fileName, (err) => {
                        if (err) {
                            console.error('Error deleting file:', fileName, err);
                        } else {
                            console.log('Deleted file:', fileName, 'success');
                        }
                    });
                } catch (err) {
                    console.error('Error deleting file:', fileName, err);
                }
            }));
        }
        // ลบข้อมูลสินค้าออกจากฐานข้อมูล
        const removed = await Articles.findOneAndDelete({ _id: id }).exec()
        res.send(removed)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

