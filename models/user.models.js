const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})



UserSchema.pre("save",async function(){
    const hashedPassword=await bcrypt.hash(this.password,10)
    this.password=hashedPassword
})

const User=mongoose.model('User',UserSchema)


module.exports={
    User
}