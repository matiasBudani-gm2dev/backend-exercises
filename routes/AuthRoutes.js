import express from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"

import { validateRequiredFiles } from '../utils/ValidateRequieredFiles.js';
import { createNewUser } from '../service/UserService.js';
import { getRoleByName } from '../service/RolesService.js';
import { validatePassword } from '../models/UserModel.js';
import { createNewUserRole } from '../service/UsersRolesService.js'; 

const authRouter = express.Router();

const requiredFields = ["user_name", "password"]

authRouter.post("/register", async(req, res, next)=>{
    try{
        const{ user_name, email, password} = req.body
        if(!validateRequiredFiles(req, requiredFields)){
            res.status(400).send("Missing data")
        }
        if(!validatePassword(password)){
            res.status(400).send("The password needs to have at least 6 characters")
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await createNewUser({user_name, email, passwordHash })
        const roleUser = await getRoleByName("user")

        const user_id = newUser.userId
        const role_id = roleUser.roleId

        await createNewUserRole({user_id, role_id})

        res.status(201).send(newUser)
    }catch(err){
        next(err)
    }
})

authRouter.post("/login", async(req, res, next)=>{
    
})

export default authRouter