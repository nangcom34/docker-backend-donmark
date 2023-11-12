const Job = require("../Models/job");

exports.list = async (req, res) => {
    try {
        const jobed = await Job.find({}).exec();
        res.send(jobed);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.listby = async (req, res) => {
    try {
        console.log(req.body)
        const { limit, sort, order } = req.body

       const jobed = await Job.find()
            .limit(limit)
            .sort([[sort, order]])
            .exec();


        res.send(jobed);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}
exports.create = async (req, res) => {
    try {
        const jobed = await Job.create(req.body);
        res.send(jobed);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const jobed = await Job.findOne({ _id: id });
        res.send(jobed);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        var newData = req.body
        console.log(req.body)
        const jobed = await Job.findOneAndUpdate({ _id: id }, newData, { new: true });
        res.send(jobed);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const jobed = await Job.findOneAndDelete({ _id: id });
        res.send(jobed);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};