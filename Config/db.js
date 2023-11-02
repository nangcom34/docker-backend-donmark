const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE)
        console.log(`ConnectDB Success`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB