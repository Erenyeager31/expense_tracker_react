const express = require('express')
const Expense = require('../models/Expense')
const router = express.Router()
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

// !Endpoint for saving the expense into the MongoDB

router.post('/save_expense',[
    body('expensename','Please Enter a Valid Name for expense').exists(),
    body('expenseamount','Please enter a valid amount').isNumeric()
],
async (req,res) =>{
    // console.log(req.header('email'))
    // console.log(req.body)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            error:errors.array()
        })
    }

    const {expensename,expenseamount,category} = req.body
    try {
        // console.log("stage 1")
        let expense = await Expense.create({
            email:req.header('email'),
            expense_name:expensename,
            amount:expenseamount,
            category: category
        })
        // console.log("stage 2")
        return res.status(200).json({
            success:true,
            message:"Entry saved succesfully"
        })
    } catch (error) {
        return res.status(400).json({
            success:true,
            error:error.message,
            message:"Some Internal error occured"
        })
    }
})


// !Endpoint to fetch all the expense as per the filter

router.post('/fetch_expenses',[
    body('email',"Please Login").exists()
],
async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            success:false,
            error:errors,
            message:"Please Login"
        })
    }
    // console.log(req.body.email)
    const email = req.body.email;
    let expenses = Expense.findOne({email:"diptishah81.ds@gmail.com"})
    console.log(expenses.all())

    res.status(200).json({
        message:"Success"
    })
})
module.exports = router