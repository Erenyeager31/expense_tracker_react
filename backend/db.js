const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/Expense_tracker"

const connectToMongo = () => {
    mongoose.connect(mongoURI)
}

module.exports = connectToMongo;