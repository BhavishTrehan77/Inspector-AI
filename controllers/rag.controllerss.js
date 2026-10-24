const { RagAnswer } = require("../services/rag.services")

const AskProject=async(req,resp)=>{
    try{
        const userId=req.user.id
        const projectId=req.params.projectId
        const{query}=req.body

        const result=await RagAnswer(userId,projectId,query)
        return resp.json({
            success:true,
            message:"Rag answer generated successfully",
            data:result
        })
    }catch(err){
        return resp.status(400).json({
            success: false,
            message: err.message
        })
    }
}

module.exports={
    AskProject
 
}