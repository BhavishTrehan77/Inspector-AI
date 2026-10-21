const { Auth } = require("../middlewares/Auth")
const { Signup, Login } = require("../services/user.services")
const jwt=require('jsonwebtoken')
const signup=async(req,resp)=>{
    try{
    const data=await Signup(req.body)
    resp.json({
        success:true,
        data
    })
    }catch(err){
        console.log(err)
        return resp.json({
            message:err.message
        })
    }
}
const login=async(req,resp)=>{
    try{
    const data=await Login(req.body.email,req.body.password)
    resp.json({
        success:true,
        data
    })
    }catch(err){
        return resp.json({
            message:err.message
        })
    }
}

const refreshToken=async(req,resp)=>{
    try{
    const AuthHeader=req.headers.authorization
    if(!AuthHeader || !AuthHeader.startsWith("Bearer ")){
        throw new Error("no token")
    }
    const token=AuthHeader.split(" ")[1]
    const decoded=jwt.verify(token,process.env.RefSecKey)
    const genRefToken=jwt.sign({id:decoded.id},process.env.AccSecKey,{expiresIn:"2d"})
   return resp.status(200).json({
            accessToken: genRefToken
        })
    }
    catch(err){
        return resp.status(401).json({
            message: "Invalid or expired refresh token"
        })
    }
}

module.exports={
    signup,
    login,
    refreshToken
}