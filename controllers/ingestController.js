const { IngestProject } = require("../services/project.ingestion.servoces")


const ingestProject=async(req,resp)=>{
    try{
        const userId=req.user.id
        const projectId=req.params.projectId
        const{files}=req.body

        const result=await IngestProject(userId,projectId,files)
        return resp.status(200).json({
            success: true,
            message: "Project ingested successfully",
            data: result
        })

    }catch(err){
         return resp.status(400).json({
            success: false,
            message: err.message
        })
    }
}
module.exports={
    ingestProject
}