import  jwt, { type JwtPayload }  from 'jsonwebtoken';
import type { NextFunction, Request, Response } from "express";
import { jwtSecret } from './index.js';




export const userMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {token} =req.cookies;
        if(!token){
            throw new Error("You are not logged in")
        }
        const payload =jwt.verify(token,jwtSecret!)
        if(!payload){
            throw new Error("Invalid token")
        }
        if(payload){
            req.userId=(payload as JwtPayload).id
            next()
        }
        
    } catch (error:any) {
        res.status(500).json({
            message:error.message
        })
        
    }
    


}