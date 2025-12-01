import  jwt  from 'jsonwebtoken';
import type { NextFunction, Request, Response } from "express";
import { jwtSecret } from './CONFIG.js';

export const userMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {token} =req.cookies;
        if(!token){
            throw new Error("No token found")
        }
        const payload =jwt.verify(token,jwtSecret)
        if(!payload){
            throw new Error("Invalid token")
        }
        const req.userId= payload.id,
        
    } catch (error) {
        
    }
    


}