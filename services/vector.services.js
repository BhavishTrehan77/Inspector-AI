const { default: mongoose } = require("mongoose")
const { CodeEmbedding } = require("../models/codeEmbedding.model")
const { GenerateEmbedding } = require("./embedding.services")

const StoreEmbedding=async(embedChunks)=>{
    if (!embedChunks || embedChunks.length === 0) {
        throw new Error("No embeddings to store")
    }
    const documents=await CodeEmbedding.create(embedChunks)
    return documents
}


const CreateVectorIndex=async()=>{
    const index={
        name:"vector_index",
        type:"vectorSearch",
        definition: {
            fields:[
                {
                    type:"vector",
                    path:"embedding",
                    numDimensions:3072,
                    similarity:"cosine"
                },{
                    type:"filter",
                    path:"projectId"
                }
            ]
        }

    }
    const result=await CodeEmbedding.collection.createSearchIndex(index)
    return result
}

const SearchCodebase=async(query,projectId)=>{
    if(!query){
        throw new Error("Search query is required")
    }
    if(!projectId){
        throw new Error("Project Id is  required")
    }
    const queryEmbedding=await GenerateEmbedding(query)
    const results=await CodeEmbedding.aggregate([
        {
            $vectorSearch:{
                index:"vector_index",
                path:"embedding",
                queryVector:queryEmbedding,
                numCandidates:50,
                limit:5,
                filter:{
                    projectId:new mongoose.Types.ObjectId(projectId)
                }
            }
        },{
            $project:{
                _id:1,
                projectId:1,
                filePath:1,
                sha:1,
                chunkIndex:1,
                content:1,
                score:{
                    $meta:"vectorSearchScore"
                }
            }
        }
    ])
    return results
}


const ListVectorIndexes=async()=>{
    const indexes=await CodeEmbedding.collection.listSearchIndexes().toArray()

    return indexes
}
module.exports={
    StoreEmbedding,
    CreateVectorIndex,
    SearchCodebase,
    ListVectorIndexes
}