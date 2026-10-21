const mongoose=require('mongoose')



const PorjectSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    },
    name:{
        type:String,
        required:true,
        trim :true
    },
    description:{
        type:String,
        default:""
        
    },
    githubOwner:{
        type:String,
        required:true
    },
    githubRepo:{
        type:String,
        required:true
    },
    githubUrl:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Project=mongoose.model('Project',PorjectSchema)


module.exports=Project