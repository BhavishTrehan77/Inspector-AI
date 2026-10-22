require('dotenv').config()
const connectdb = require("../config/mongo")
const { CodeEmbedding } = require('../models/codeEmbedding.model')
const { CreateVectorIndex } = require("../services/vector.services")

const run=async()=>{
    try{

        await connectdb()
        const result=await CreateVectorIndex()
        console.log("Vector index creation",result)
    }catch(err){
        console.log("Vector index creation failed:",err)
    }
}



run()

