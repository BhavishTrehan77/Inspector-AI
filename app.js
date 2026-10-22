const express=require('express')
const connectdb = require('./config/mongo')
const helmet=require('helmet')
const {router}=require('../Backend/routes/user.routes')
const Projectrouter=require('../Backend/routes/project.routes')
const Ingestrouter=require('../Backend/routes/ingest.routes')
const app=express()
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({extended:true}))



app.use("/api/v1",router)

app.use("/api/projects",Projectrouter)


app.use("/api",Ingestrouter)

connectdb()




module.exports=app
