const express=require('express')
const { Auth } = require('../middlewares/Auth')
const { AskProject } = require('../controllers/rag.controllerss')
const router=express.Router()




router.post("/ask/:projectId",Auth,AskProject)


module.exports=router