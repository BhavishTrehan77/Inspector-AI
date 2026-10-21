const express=require('express')
const { signup, login, refreshToken } = require('../controllers/user.controllers')


const router=express.Router()


router.post("/signup",signup)
router.post("/login",login)
router.post("/refToken",refreshToken)

module.exports={
    router
}