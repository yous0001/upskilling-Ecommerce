import mongoose from "mongoose"
import { userRoles } from "../utils/user-roles.enum.js"

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
        default:"user",
        required:true
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    cart:{
        products:[{
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            quantity:{
                type:Number,
                default:1
            }
        }],
        subtotal:{
            type:Number,
            default:0
        },
        totalPrice:{
            type:Number,
            default:0
        },
        discount:{
            type:Number,
            default:0
        },
        appliedCoupon:{
            type:String
        },
    }
},{
    timestamps:true
})

const User=mongoose.models.User || mongoose.model("User",userSchema)
export default User