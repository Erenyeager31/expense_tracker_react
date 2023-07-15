const express = require('express')
const Expense = require('../models/Expense')
const router = express.Router()
const {body,validationResult, header} = require('express-validator');
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
    let expenses =await Expense.find({email})
    // console.log(expenses[0].category)
    // for (doc in expenses){
    //     console.log(expenses[doc].category)
    // }

    res.status(200).json({
        data:expenses,
        message:"Success"
    })
})

//!Endpoint to delete the expense by using the ID passed by the delete button
router.post('/delete_expense',
async (req,res) =>{
    const id = req.body.id;
    // console.log(id)
    let deleted_expense = await Expense.findByIdAndDelete(id)
    // console.log(deleted_expense)
    const success = true
    const message = "Expense Deleted Successfully"
    if(deleted_expense === null){
        const success = false
        const message = "Could not delete the expense"    
        return res.status(200).json({success,message})
    }
    return res.status(200).json({success,message})
    
    
})

// !Endpoint for fetching the data based on the filter
router.post('/filter_fetch',
    async (req,res)=>{
        const keyword = req.body.keyword
        const category = req.body.category
        const min = req.body.min
        const max = req.body.max
        const email = req.header("email")

        let fetch_data = []
        if(category === ""){
            // console.log("inside")
            fetch_data = await Expense.find({email:email})    
        }
        else{
            fetch_data = await Expense.find({email:email,category:category})
        }
        const data = []
        for( let i in fetch_data){
            // console.log(fetch_data[i].expense_name)
            // !Making the comparission of the strings by converting both of 
            // !them into lowercase so it wont matter what case the user
            // !uses for searching as keyword
            if((fetch_data[i].expense_name).toLowerCase().includes(keyword.toLowerCase())){
                // ?This part check for range of amount entered by the user
                if(min!== "" && max !== ""){
                    // console.log("inside else")
                    if(fetch_data[i].amount >= min && fetch_data[i].amount <= max ){
                        // !If the condition is met , data is pushed
                        data.push(fetch_data[i])
                    }
                }
                else if(min !== ""){
                    if(fetch_data[i].amount >= min){
                        // !If the condition is met , data is pushed
                        data.push(fetch_data[i])
                    }
                }
                else if(max !== ""){
                    if(fetch_data[i].amount <= max ){
                        // !If the condition is met , data is pushed
                        data.push(fetch_data[i])
                    }
                }
                else{
                    // console.log(fetch_data[i])
                    data.push(fetch_data[i])
                    // console.log("inside else")
                }
                
                
            }
        }

        // ? Converting data to string and checing if it is still empty
        if(data.toString() == ""){
            // console.log("no data")
            return res.status(200).json({success:false,data})
        }
        else{
            return res.status(200).json({success:true,data})
        }
})

// !API Endpoint for obtaining stats data

router.post('/fetch_stats',
async (req,res)=>{
    // ?Creating an object of class Date
    const timestamp = new Date()
        const current_year = timestamp.getFullYear()    //Obtaining current year
        const cur_month = timestamp.getMonth()          //Obtaining current Month
        const prev_month = cur_month - 1;
        const cur_date = timestamp                      //Obtaining current date
        // console.log(cur_date)   //today's date and time

    const current_start = new Date(current_year+"-04-01")
    const current_end = new Date((current_year+1).toString()+"-03-31")  //current fiscal year
    const previous_start = new Date((current_year-1).toString()+"-04-01")
    const previous_end = new Date(current_year+"-03-31")                //previous fiscal year

    // console.log(current_start)
    // console.log(current_end)
    // console.log(previous_start)
    // console.log(previous_end)



    // !Obtaining Email
    const email = req.header("email")

    // !Creating a list of categories
    const category = ["Credit-card Bill","Books","stationary","Groceries"]

    // !Fetching all the expenses of the user
    const all_expense = await Expense.find({email})
    
    // !Creating a json for all the Required data
    const stats = {
        "current-fiscal":0,
        "previous-fiscal":0,
        "lifetime-expense":0,
        [category[0]]:{
            "current_f":0,
            "previous_f":0,
            "lifetime":0
        },
        [category[1]]:{
            "current_f":0,
            "previous_f":0,
            "lifetime":0
        },
        [category[2]]:{
            "current_f":0,
            "previous_f":0,
            "lifetime":0
        },
        [category[3]]:{
            "current_f":0,
            "previous_f":0,
            "lifetime":0
        }
    }
    // console.log(stats)
    for(let i in all_expense){
        stats['lifetime-expense'] = stats['lifetime-expense'] + all_expense[i].amount;
        for(let j in category){
            if(category[j] === all_expense[i].category){
                // console.log(category[j])
                stats[category[j]].lifetime = stats[category[j]].lifetime + all_expense[i].amount

                // console.log(all_expense[i].timestamp.getMonth())
                // !Checking if the year and month of the expense is in the current fiscal year
                if(all_expense[i].timestamp >= current_start && all_expense[i].timestamp <= current_end){
                    stats[category[j]].current_f = stats[category[j]].current_f + all_expense[i].amount;
                    stats['current-fiscal'] = stats['current-fiscal'] + all_expense[i].amount
                }
                if(all_expense[i].timestamp >= previous_start && all_expense[i].timestamp <= previous_end){
                    stats[category[j]].previous_f = stats[category[j]].previous_f + all_expense[i].amount;
                    stats['previous-fiscal'] = stats['previous-fiscal'] + all_expense[i].amount
                }
                // console.log(stats[category[j]].life)     //lifetime expenses
                break;
            }       
        }
    }
    // console.log(stats)
    return res.status(200).json(stats)
})
module.exports = router