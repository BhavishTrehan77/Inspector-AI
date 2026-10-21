
const Auth=async(req,resp,next)=>{
    try{
    if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')){
        throw new Error("Invalid token")
    }
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,process.env.AccSecKey)
    req.user=decoded
    return next()
    }catch(err){
        return resp.json({
            message:err.message
        })
    }

}
module.exports={
    Auth
}