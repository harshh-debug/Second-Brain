import mongoose, { Schema } from "mongoose";
mongoose.connect("mongodb+srv://harshcoder_09:%23harshtag@cluster1.cu2gwko.mongodb.net/SecondBrain")

const userSchema = new Schema({
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
})

export const userModel = mongoose.model("user",userSchema)

const contentSchema= new Schema({
    title:String,
    link:String,
    tags:[{type:Schema.Types.ObjectId,ref:"tag"}],
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

export const contentModel=mongoose.model("content",contentSchema)