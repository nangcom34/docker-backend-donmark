const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    position: {
        type: String,
    },
    format: {
        type: String,
    },
    amount: {
        type: String,
    },
    location: {
        type: String,
    },
    salary: {
        type: String,
    },
    dayOff: {
        type: String,
    },
    time: {
        type: String,
    },
    timeOther: {
        type: String,
        default: "ไม่ระบุ"
    },
    responsibilities: {
        type: String,
    },
    sex: {
        type: String,
    },
    age: {
        type: String,
    },
    education: {
        type: String,
        default: "ไม่ระบุ"
    },
    experience: {
        type: String,
    },
    other: {
        type: String,
        default: "ไม่ระบุ"
    },
    welfare: {
        type: String,
    },
    ContactName: {
        type: String,
    },
    ContactCall: {
        type: String,
    },
    ContactEmail: {
        type: String,
    },




}, { timestamps: true })

module.exports = mongoose.model('jobs', JobSchema)