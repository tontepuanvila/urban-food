import mongoose from "mongoose";
import _default from "validator";


const menuSchema=new mongoose.Schema({
    name:{type:String,required:true},
    category:{type:String},
    image:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    availability:{type:Boolean,default:true}
})

const menuModel=mongoose.models.menu||mongoose.model("Menu",menuSchema)

export default menuModel