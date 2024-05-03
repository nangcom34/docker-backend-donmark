const SubCategory = require("../Models/subCategory");

exports.list = async (req, res) => {
    try {
        const subCategories = await SubCategory.find({}).populate("category").exec();
        res.send(subCategories);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.listby = async (req, res) => {
    try {
        console.log(req.body)
        const { limit, sort, order } = req.body.filtersSubCategory
        const subCategories = await SubCategory.find()
            .limit(limit)
            .sort([[sort, order]])
            .populate("category")
            .exec();


        res.send(subCategories);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.listbyCat = async (req, res) => {
    try {
        const { category } = req.body;
        console.log(category)

        const subCategories = await SubCategory.find({ category: category });
        res.json(subCategories);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}
exports.create = async (req, res) => {
    try {
        console.log(req.body)
        const { name, category } = req.body;
        const subCategories = await new SubCategory({ name, category }).save();
        res.send(subCategories);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const subCategories = await SubCategory.findOne({ _id: id })
        res.send(subCategories);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, category } = req.body;

        const subCategories = await SubCategory.findOneAndUpdate(
            { _id: id },
            {
                name: name,
                category: category
            }
        );
        res.send(subCategories);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const subCategories = await SubCategory.findOneAndDelete({ _id: id });
        res.send(subCategories);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};