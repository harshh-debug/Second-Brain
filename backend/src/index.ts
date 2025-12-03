import dotenv from "dotenv";
dotenv.config();

import cookieParser from"cookie-parser"
import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { connectDB, contentModel, userModel } from "./db.js";
import { userMiddleware } from "./middleware.js";
await connectDB()
export const jwtSecret = process.env.JWTSECRET as string;

const app =express()
app.use(express.json());
app.use(cookieParser())
app.post("/api/v1/signup",async(req,res)=>{
    const username= req.body.username
    const password=req.body.password
    try {
        await userModel.create({
            username:username,
            password:password
        })
        
        res.json({
            message:"user signed up"
        })
    } catch (error) {
        res.status(403).json({
            message:"username already exists"
        })
    }

})

app.post("/api/v1/signin",async(req,res)=>{
    try {
        const username= req.body.username;
        const password=req.body.password;
        const existingUser = await userModel.findOne({
            username,password
        })
        if(!existingUser){
            return res.status(403).send("User does not exist")
        }
        if(existingUser){
            const token = jwt.sign({
                id:existingUser._id,username:existingUser.username
            },jwtSecret)
            res.cookie("token",token)
            res.json("Signed in")
        }
        else{
            res.status(403).json({
            message:"Invaild username or password"})
        }

    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        })
        
    }

    


})
app.post("/api/v1/content",userMiddleware,async(req,res)=>{
    const link =req.body.link
    const title=req.body.title
    const typeoflink=req.body.type

    await contentModel.create({
        link,
        typeoflink,
        title,
        // @ts-ignore
        userId:req.userId,
        tags:[]

    })

    return res.status(200).json({
        message:"Content added"
    })


})

app.get("/api/v1/content",userMiddleware,async(req,res)=>{

    //@ts-ignore
    const userId= req.userId,
    const content = await contentModel.find({
        userId:userId
    }).populate("userId","username")
    return res.json({
        content
    })



})

app.delete("/api/v1/content",async(req,res)=>{
    const contentId=req.body.contentId

    await contentModel.deleteOne({
        contentId,
        // @ts-ignore
        userId:req.userId
    })
    res.json({
        message:"Content deleted successfully"
    })
})

app.post("/api/v1/brain/share",userMiddleware,async(req,res)=>{
    const share:boolean =req.body.share 

    if(share){
        await userModel.updateOne(
            // @ts-ignore
            { _id: req.userId },        
            { $set: { share: true } }  
        )
        res.json({
            link:"link_to_open_brain"
        })
    }
    res.status(400).json({
        message:"Share field not true"
    })

})

app.get("/api/v1/brain/:shareLink",(req,res)=>{
    
})

app.listen(3000,()=>{
    console.log("Listening at 3000")
})