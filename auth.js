const express = require("express")
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require('../models/User')

const router=express.Router()

router.post("/register",async (req,res)=>{
    const {name,email,password,mobile}=req.body
    try{
        const existingUser = await User.findOne({email})
        if(existingUser) 
            return res.status(400).json({"message":"User already exists"})
        const newUser = new User({name,email,password,mobile})
        await newUser.save()
        res.status(201).json({"message":"User created successfully"})
    }
    catch(e){
        res.status(500).json({"message":"Server error"})
    }
})

router.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({"message":"user not fond"})
        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch) 
            return res.status(400).json({"message":"Invalid password"})
        res.status(200).json({"userId":user._id})
    }
    catch(error){
        res.status(500).json({"message":"server error"})
    }
})


module.exports=router