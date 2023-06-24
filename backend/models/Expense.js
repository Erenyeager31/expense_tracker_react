const mongoose =  require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    expense_name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Expense',ExpenseSchema)