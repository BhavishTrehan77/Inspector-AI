
const { User } = require("../models/user.models")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const Signup=async(body)=>{
    const value=await User.create(body)
    return value
}


const Login=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error("user with this email not found")
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("Password didnt match")
    }
    const AccToken=jwt.sign({id:user._id},process.env.AccSecKey,{expiresIn:"15m"})
    const RefToken=jwt.sign({id:user._id},process.env.RefSecKey,{expiresIn:"2d"})
    return{
        user,
        AccToken,
        RefToken
    }
}


module.exports={
    Signup,
    Login
}