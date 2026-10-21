const express=require('express')
const connectdb = require('./config/mongo')
const helmet=require('helmet')
const {router}=require('../Backend/routes/user.routes')

const app=express()
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({extended:true}))



app.use("/api/v1",router)

connectdb()


module.exports=app
