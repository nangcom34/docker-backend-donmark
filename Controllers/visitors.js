const Visitors = require("../Models/visitors");

exports.list = async (req, res) => {
    try {
        const visitored = await Visitors.find({}).exec();
        res.send(visitored);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.listby = async (req, res) => {
    try {
        console.log(req.body)
        const { limit, sort, order, query } = req.body.filters


        let producted;

        if (query === "" || !query) {
            // หาก query เป็นข้อความว่าง
            producted = await Visitors.find()
                .limit(limit)
                .sort([[sort, order]])
                .populate("category")
                .exec();
        } else {
            // หาก query มีค่า
            producted = await Visitors.find({ $text: { $search: `*${query}*` } })
                .limit(limit)
                .sort([[sort, order]])
                .populate("category")
                .exec();
        }

        res.send(producted);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}
exports.create = async (req, res) => {
    try {
        console.log(req.body)
        const { visitors } = req.body;
        const visitored = await new Visitors({ visitors }).save();
        res.send(visitored);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const visitored = await Visitors.findOne({ _id: id });
        res.send(visitored);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { visitors } = req.body;

        const visitored = await Visitors.findOneAndUpdate(
            { _id: id },
            { visitors: visitors }
        );
        res.send(visitored);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const visitored = await Visitors.findOneAndDelete({ _id: id });
        res.send(visitored);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};

exports.changeVisitors = async (req, res) => {
    try {
        console.log(req.body)
        const visitored = await Visitors.findOneAndUpdate({ _id: req.body.id }, { visitors: req.body.visitors })
        res.send(visitored)

    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error!`)
    }
}