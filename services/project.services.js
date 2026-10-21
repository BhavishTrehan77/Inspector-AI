const Project = require("../models/Project.model")
const { User } = require("../models/user.models")
const { GetRepository } = require("./github.services")

const CreateProject=async(userId,data)=>{
    const{name,description,githubOwner,githubRepo,githubUrl}=data
    const user=await User.findById(userId)
    if(!user){
        throw new Error("no user found")
    }
    if(!name || !githubOwner || !githubRepo || !githubUrl){
        throw new Error("required fields not defined")
    }
    const repo=await GetRepository(githubOwner,githubRepo)
    if(!repo){
        throw new Error("repo not found")
    }
    const newProject=await Project.create({
       
    userId,name,description,githubOwner,githubRepo,githubUrl
    })
    return newProject
}
const GetProjects=async(userId)=>{
    const project=await Project.find({userId})
    
    if (project.length === 0) {
        throw new Error("No project data for this particular user found in the database")
    }
    return project
}

const GetProjectById=async(userId,projectId)=>{
    const project=await Project.findOne({_id:projectId,userId})
    if(!project){
        throw new Error("project not found")
    }
    return project
}

const UpdateProject=async(userId,projectId,data)=>{
    const project=await Project.findOne({_id:projectId,userId})
    if(!project){
        throw new Error("project not found")
    }
    const{
        name,description,githubOwner,
        githubRepo,githubUrl
    }=data

    if(name!==undefined){
        project.name=name
    }
    if(description!=undefined){
        project.description=description
    }
    if(githubOwner!=undefined){
        project.githubOwner=githubOwner
    }
    if(githubRepo!=undefined){
        project.githubRepo=githubRepo
    }
    if(githubUrl!=undefined){
        project.githubUrl=githubUrl
    }
    await project.save()
    return project
}

const DeleteProject=async(userId,projectId)=>{
    const project=await Project.findOne({_id:projectId,userId})
    if(!project){
        throw new Error("project not found")
    }
    await project.deleteOne()
    return{
        message:"Project deleted successfully"
    }
}

module.exports={
    CreateProject,
    GetProjects,
    GetProjectById,
    UpdateProject,
    DeleteProject
}


