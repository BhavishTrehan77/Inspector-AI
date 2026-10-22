const ai = require("../config/ai")
const Project = require("../models/Project.model")
const { SearchCodebase } = require("./vector.services")

const RagAnswer=async(userId,projectId,query)=>{
    if (!query || !query.trim()) {
        throw new Error("Query is required")
    }
    const project=await Project.findOne({
        _id:projectId,
        userId
    })
    if(!project){
        throw new Error("Project not found")
    }
    const results=await SearchCodebase(query,projectId)

    if (!results || results.length === 0) {
        return {
            answer: "I could not find relevant information in the indexed codebase.",
            sources: []
        }
    }
    const context=results.map((item,index)=>{
        return `source ${index+1}
        File: ${item.filePath}
        Chunk: ${item.chunkIndex}
        ${item.content}
        `
      
    }).join("\n\n")
    const response=await ai.models.generateContent({
        model:"gemini-3.6-flash",
        contents:`
        User Query
        ${query}
        Answer the user questions user query using the context the context is ${context}

        Roles:
        - Use the code context as the primrary source of truth
        - Do not invent files,funtion or behaviour that are not present in the context.
        Keep the answer concise but technically useful 
        `
    })
    return{
        answer:response.text,
         sources: results.map(item => ({
            filePath: item.filePath,
            chunkIndex: item.chunkIndex,
            score: item.score
        }))
    }
}

module.exports={
    RagAnswer
}