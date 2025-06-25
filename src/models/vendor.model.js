import mongoose from "mongoose";

const vendorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
})

const Vendor=mongoose.model('Vendor',vendorSchema)
export default Vendor