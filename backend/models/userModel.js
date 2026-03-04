import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    address:{type:String,default:""},
    phone:{type:String,default:""}
},{minimize:false})


const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;
