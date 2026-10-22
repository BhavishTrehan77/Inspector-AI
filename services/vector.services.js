const { CodeEmbedding } = require("../models/codeEmbedding.model")

const StoreEmbedding=async(embedChunks)=>{
    if (!embedChunks || embedChunks.length === 0) {
        throw new Error("No embeddings to store")
    }
    const documents=await CodeEmbedding.create(embedChunks)
    return documents
}

module.exports={
    StoreEmbedding
}