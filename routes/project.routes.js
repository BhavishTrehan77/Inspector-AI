const express=require('express')
const { createProject, getProjects, getProjectById, updateProject, deleteProject } = require('../controllers/project.controllers')
const { Auth } = require('../middlewares/Auth')

const router=express.Router()



router.post("/create",Auth,createProject)
router.get("/get",getProjects)
router.get("/get/:id",getProjectById)
router.patch("/update",updateProject)
router.delete("/delete",deleteProject)


module.exports=router