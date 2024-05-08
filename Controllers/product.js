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

exports.getOne = async (req, res) => {
    try {
        // code
        const { id } = req.body
        console.log("id-->", id)
        const producted = await Product.findOne({ _id: id }).populate("category", "_id name").populate("subCategory", "_id name").populate("subSubCategory", "_id name").exec();
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
        const producted = await Product.find().populate("category", "_id name").populate("subCategory", "_id name").populate("subSubCategory", "_id name").exec();
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
                .populate("category", "_id name").populate("subCategory", "_id name").populate("subSubCategory", "_id name")
                .exec();
        } else {
            const regexQuery = new RegExp(query.split(' ').join('.*'), 'i');
            producted = await Product.find({ name: regexQuery })
                .limit(limit)
                .sort([[sort, order]])
                .populate("category", "_id name").populate("subCategory", "_id name").populate("subSubCategory", "_id name")
                .exec();

        }

        res.send(producted);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

exports.listByCat = async (req, res) => {
    try {
        console.log(req.body);
        const { limit, sort, order, category, subCategory, subSubCategory } = await req.body.filters;
        // สร้าง query สำหรับค้นหาสินค้าโดยใช้เงื่อนไขสำหรับหมวดหมู่และซับหมวดหมู่เท่านั้น
        const query = {};

        // ตรวจสอบและเพิ่มเงื่อนไขสำหรับการค้นหาจากหมวดหมู่และซับหมวดหมู่
        if ((category && category.length > 0) || (subCategory && subCategory.length > 0) || (subSubCategory && subSubCategory.length > 0)) {
            const orConditions = [];

            if (category && category.length > 0) {
                orConditions.push({ category: { $in: category } });
            }

            if (subCategory && subCategory.length > 0) {
                orConditions.push({ subCategory: { $in: subCategory } });
            }

            if (subSubCategory && subSubCategory.length > 0) {
                orConditions.push({ subSubCategory: { $in: subSubCategory } });
            }

            query.$or = orConditions;
        }

        console.log("query", query)

        // ทำการค้นหาสินค้าโดยใช้ query และส่งกลับผลลัพธ์
        const products = await Product.find(query)
            .limit(limit)
            .sort([[sort, order]])
            .populate("category", "_id name").populate("subCategory", "_id name").populate("subSubCategory", "_id name")
            .exec();;

        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};


exports.listbyRecommend = async (req, res) => {
    try {
        // code
        const { limit, sort, order } = req.body

        const producted = await Product.find({ recommend: true })
            .populate("category", "_id name").populate("subCategory", "_id name").populate("subSubCategory", "_id name")
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

exports.listByRecommendCat = async (req, res) => {
    try {
        console.log(req.body);
        const { limit, sort, order, category, subCategory, subSubCategory } = await req.body.filters;
        // สร้าง query สำหรับค้นหาสินค้าโดยใช้เงื่อนไขสำหรับหมวดหมู่และซับหมวดหมู่เท่านั้น
        const query = { recommend: true }; // เพิ่มเงื่อนไข recommend เป็น true

        // ตรวจสอบและเพิ่มเงื่อนไขสำหรับการค้นหาจากหมวดหมู่และซับหมวดหมู่
        if ((category && category.length > 0) || (subCategory && subCategory.length > 0) || (subSubCategory && subSubCategory.length > 0)) {
            const orConditions = [];

            if (category && category.length > 0) {
                orConditions.push({ category: { $in: category } });
            }

            if (subCategory && subCategory.length > 0) {
                orConditions.push({ subCategory: { $in: subCategory } });
            }

            if (subSubCategory && subSubCategory.length > 0) {
                orConditions.push({ subSubCategory: { $in: subSubCategory } });
            }

            if (orConditions.length > 0) {
                query.$or = orConditions;
            }
        }

        console.log("query", query)

        // ทำการค้นหาสินค้าโดยใช้ query และส่งกลับผลลัพธ์
        const products = await Product.find(query)
            .limit(limit)
            .sort([[sort, order]])
            .populate("category", "_id name")
            .populate("subCategory", "_id name")
            .populate("subSubCategory", "_id name")
            .exec();

        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

exports.create = async (req, res) => {
    try {
        // code
        console.log("req.body", req.body.data)
        console.log("req.files", req.files)
        var data = req.body
        if (req.files) {
            data.files = req.files.map(file => file.filename)
        }
        console.log("data", data.files)
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
        const id = req.params.id;
        let newData = req.body;
        console.log("newData-->", newData);
        console.log("req.files-->", req.files);

        //เช็คและแปลง string เป็น array
        if (typeof newData.files === 'string') {
            newData.files = [newData.files]
        }
        if (typeof newData.fileOld === 'string') {
            newData.fileOld = [newData.fileOld]
        }


        if (req.files && req.files.length > 0) {
            const fileNames = req.files.map(file => file.filename);
            newData.files = fileNames;
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

        console.log("newData.files", newData.files);
        // ลบ property fileOld ออกเนื่องจากไม่ได้ใช้อีกต่อไป
        delete newData.fileOld;

        // ตรวจสอบและลบถ้าเป็น ""
        if (newData.subSubCategory === "" || newData.subSubCategory === undefined || newData.subSubCategory === "undefined") {
            newData.subSubCategory = undefined; // กำหนดให้เป็น undefined เพื่อใช้ในการลบ
        }
        // สร้าง object สำหรับการอัปเดต
        let updateObj = newData;
        if (newData.subSubCategory === undefined) {
            updateObj = { ...newData, $unset: { subSubCategory: 1 } };
        }

        // อัปเดตข้อมูลใหม่ลงในฐานข้อมูล
        const updated = await Product.findOneAndUpdate({ _id: id }, updateObj, { new: true });

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
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        if (product.files && product.files.length > 0) {
            await Promise.all(product.files.map(async fileName => {
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
        const removed = await Product.findOneAndDelete({ _id: id }).exec()
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

