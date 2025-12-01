import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { userModel } from "./db.js";
import { jwtSecret } from "./CONFIG.js";

const app =express()
app.use(express.json());
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

app.post("/api/v1/sigin",async(req,res)=>{
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
            res.cookie("Token",token)
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
app.post("/api/v1/content",(req,res)=>{
    const link =req.body.link
    const title=req.body.title
    const type=req.body.type


})

app.get("/api/v1/content",(req,res)=>{

})

app.delete("/api/v1/content",(req,res)=>{

})

app.post("/api/v1/brain/share",(req,res)=>{

})

app.get("/api/v1/brain/:shareLink",(req,res)=>{
    
})

app.listen(3000,()=>{
    console.log("Listening at 3000")
})