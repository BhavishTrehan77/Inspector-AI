const express=require('express')
const { ingestProject } = require('../controllers/ingestController')
const { Auth } = require('../middlewares/Auth')
const router=express.Router()



router.post("/ingestingdb/:projectId",Auth,ingestProject)

module.exports=router
