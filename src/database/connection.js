const mongoose = require('mongoose')
const { DB_URI } = require('../config/constants')

const databaseConnection = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log('Connected to MongoDB')
    } catch (err) {
        console.error('MongoDB connection error:', err)
    }
}

module.exports = databaseConnection
