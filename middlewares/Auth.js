const jwt=require('jsonwebtoken')
const Auth=async(req,resp,next)=>{
    try{
         console.log("AUTH MIDDLEWARE HIT")
    if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')){
        throw new Error("Invalid token")
    }
    const token=req.headers.authorization.split(" ")[1]
    console.log("JWT VALUE:", jwt)
    const decoded=jwt.verify(token,process.env.AccSecKey)
    req.user=decoded
    return next()
    }catch(err){
        console.error("Auth middleware error:", err.stack || err)
        return resp.status(401).json({
            message:err.message
        })
    }

}
module.exports={
    Auth
}