const { CreateProject, GetProjects, GetProjectById, UpdateProject, DeleteProject } = require("../services/project.services")

const createProject=async(req,resp)=>{
    try{
    const ans=await CreateProject(req.user.id,req.body)
    resp.json({
        success:true,
        ans
    })
    }catch(err){
        return resp.json({
            stack:err.stack
        })
    }
}
const getProjects=async(req,resp)=>{
    try{
        const ans=await GetProjects(req.user.id)
        resp.json({
            success:true,
            ans
        })
    }catch(err){
        return resp.json({
            stack:err.stack
        })
    }
}

const getProjectById=async(req,resp)=>{
    try{
        const ans=await GetProjectById(req.user.id,req.params.projectId)
        resp.json({
            success:true,
            ans
        })
    }catch(err){
        return resp.json({
            stack:err.stack
        })
    }
}


const updateProject=async(req,resp)=>{
    try{
        const ans=await UpdateProject(req.user.id,req.params.projectId,req.body)
        resp.json({
            success:true,
            ans
        })
    }catch(err){
        return resp.json({
            stack:err.stack
        })
    }
}


const deleteProject=async(req,resp)=>{
    try{
        const ans=await DeleteProject(req.user.id,req.params.projectId)
        resp.json({
            success:true,
            ans
        })
    }catch(err){
        return resp.json({
            stack:err.stack
        })
    }
}

module.exports={
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
}