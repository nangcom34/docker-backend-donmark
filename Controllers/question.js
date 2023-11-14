const Question = require("../Models/question");

exports.list = async (req, res) => {
    try {
        const questioned = await Question.find({}).exec();
        res.send(questioned);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.listby = async (req, res) => {
    try {
        console.log(req.body)
        const { limit, sort, order } = req.body

       const questioned = await Question.find()
            .limit(limit)
            .sort([[sort, order]])
            .exec();


        res.send(questioned);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}
exports.create = async (req, res) => {
    try {
        console.log(req.body)
        const questioned = await new Question(req.body).save();
        res.send(questioned);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const questioned = await Question.findOne({ _id: id });
        res.send(questioned);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        var newData = req.body
        console.log(req.body)
        const questioned = await Question.findOneAndUpdate({ _id: id }, newData, { new: true });
        res.send(questioned);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const questioned = await Question.findOneAndDelete({ _id: id });
        res.send(questioned);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};