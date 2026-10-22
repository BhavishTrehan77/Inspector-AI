const Project = require("../models/Project.model")
const { ChunkFiles } = require("../utils/chunk")
const { EmbedChunks } = require("./embedding.services")
const { IngestRepository } = require("./ingestion.services")
const { StoreEmbedding } = require("./vector.services")


const IngestProject=async(userId,projectId,files)=>{
    if(!files ||!Array.isArray(files)|| files.length==0){
        throw new Error("File paths are required")
    }
    const project=await Project.findOne({_id:projectId,userId})
    if(!project){
        throw new Error("project not founf")
    }
    const fileContents=await IngestRepository(project.githubOwner,project.githubRepo,files)
    const chunks=ChunkFiles(fileContents,project._id)
    const embeddedChunks=await EmbedChunks(chunks)
    const storedChunks=await StoreEmbedding(embeddedChunks)

    return{
        projectId:project._id,
        filesProcessed:fileContents.length,
        chunksCreated:chunks.length,
        embeddingSearch:storedChunks.length
    }
}
module.exports={
    IngestProject
}