import mongoose from "mongoose"
import { userRoles } from "../utils/user-roles.enum"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:Object.values(userRoles),
        default:"user"
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

export default mongoose.models.User || mongoose.model("User",userSchema)