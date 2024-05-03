const SubSubCategory = require("../Models/subSubCategory");

exports.list = async (req, res) => {
    try {
        const subSubCategories = await SubSubCategory.find({}).populate("subCategory").exec();
        res.send(subSubCategories);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.listby = async (req, res) => {
    try {
        console.log(req.body)
        const { limit, sort, order } = req.body.filtersSubSubCategory
        const subSubCategories = await SubSubCategory.find()
            .limit(limit)
            .sort([[sort, order]])
            .populate("subCategory")
            .exec();


        res.send(subSubCategories);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}
exports.listbySubCat = async (req, res) => {
    try {
        // รับค่า subCategory จาก request body
        const { subCategory } = req.body;
        console.log(subCategory)

        // ใช้ค่า subCategory ในการค้นหา subSubCategories ที่เกี่ยวข้อง
        const subSubCategories = await SubSubCategory.find({ subCategory: subCategory });

        // ส่งข้อมูล subSubCategories กลับไปให้ client
        res.send(subSubCategories);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}
exports.create = async (req, res) => {
    try {
        console.log(req.body)
        const { name, subCategory } = req.body;
        const subSubCategories = await new SubSubCategory({ name, subCategory }).save();
        res.send(subSubCategories);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const subSubCategories = await SubSubCategory.findOne({ _id: id }).populate("subCategory");
        res.send(subSubCategories);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, subCategory } = req.body;


        const subSubCategories = await SubSubCategory.findOneAndUpdate(
            { _id: id },
            {
                name: name,
                subCategory: subCategory
            }
        );
        res.send(subSubCategories);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const subSubCategories = await SubSubCategory.findOneAndDelete({ _id: id });
        res.send(subSubCategories);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};