const express = require('express')
const User = require('../models/User')
const router = express.Router()

const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "dishantis#$here"

router.post('/createuser',[
    body('name','Enter a valid Name').isLength({min:3}),
    body('password','Enter a valid password').isLength({min:5}),
    body('email','Enter a valid Email').isEmail()
    ],
    async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            errors:errors.array()
        })
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password,salt)

    try {
    let user =await User.findOne({email:req.body.email})
    if(user){
        console.log(user)
        return res.status(400).json({
            success:false,
            error:"User already exists"
        })
    }

    user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : secPassword,
    });
    // then(user=>res.json(user))
    // .catch(err=>{console.log(err),
    //     res.json({error:"Please enter a Unique Email"})
    // })
    
    const data = {
        user:{
            id:user.id
        }
    }
    const authtoken = jwt.sign(data,JWT_SECRET)
    console.log(authtoken)
    success=true
    res.json({success,authtoken})
    }
    catch(error){
        // console.log(error.message);
        success:false,
        res.status(500).send("Some error has Occured")
    }

    // res.send(req.body)
})

//!login endpoint
router.post('/login',[
    body('email','Enter a valid Email').isEmail(),
    body('password').exists()
    ],
    async (req,res)=>{

    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({
            success:false,
            errors:err.array()
        })
    }

    const {email,password} = req.body;
    // console.log(password)

    try{
        let user =await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,error:"Please login with the correct Credential"})
        }
        const passverify = await bcrypt.compare(password,user.password)
        // console.log(user.password)
        if(!passverify){
            return res.status(400).json({success:false,error:"Incorrect Password"})
        }
        
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET)
        // console.log(authtoken)
        success=true
        res.json({success,authtoken})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Some error has Occured during login")
    }
})

//Route 3: fetching details of the logged-in user

router.post('/fetchuser',fetchuser,
async (req,res) =>{
    try {
        const userid =await req.user.user.id;
        // console.log(userid)
        const user = await User.findById(userid).select("-password");
        // console.log(user)
        return res.status(200).json({user,message:"success"})
    } catch (error) {
        return res.status(401).send({error:"Some Internal error has occured"})
    }
})


module.exports = router