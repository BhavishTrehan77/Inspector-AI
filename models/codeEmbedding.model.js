const mongoose=require('mongoose')


const CodeEmbeddingSchema=new mongoose.Schema({
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true,
        index:true
    },
    filePath:{
        type:String,
        required:true
    },
    sha:{
        type:String,
        required:true
    },
    chunkIndex:{
        type:Number,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    embedding:{
        type:[Number],
        required:true
    }

},{timestamps:true})

const CodeEmbedding=mongoose.model('CodeEmbedding',CodeEmbeddingSchema)
module.exports={
    CodeEmbedding
}