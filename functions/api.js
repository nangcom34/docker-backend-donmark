const express = require('express')
const serverless = require('serverless-http');
const { readdirSync } = require('fs')
const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')
const connectDB = require('./Config/db')
const app = express()
require('dotenv').config()


connectDB()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({ limit: '20mb' }))
app.use('/uploads', express.static('uploads'))


readdirSync('./Routes')
    .map((r) => app.use('/api', require('./Routes/' + r)))





app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);