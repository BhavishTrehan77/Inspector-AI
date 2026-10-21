const ai = require("../config/ai")

const GenerateEmbedding=async(text)=>{
    const ans=await ai.models.generateContent({
        model:"gemini-3.6-flash",
        contents:text
    })
    return ans.embeddings[0].values
}

const EmbedChunks=async(chunks)=>{
    const embedChunks=[]
    for(const chunk of chunks){
        const embedding=await GenerateEmbedding(chunk.content)
        embedChunks.push({
            ...chunk,embedding
        })
    }
    return embedChunks
}

module.exports={
    GenerateEmbedding,
    EmbedChunks
}