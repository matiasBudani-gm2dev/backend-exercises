import express from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"

import { validateRequiredFiles } from '../utils/ValidateRequieredFiles.js';
import { createNewUser, getUserbyEmail } from '../service/UserService.js';
import { getRoleByName } from '../service/RolesService.js';
import { validatePassword } from '../models/UserModel.js';
import { createNewUserRole, getAllRolesFromUser } from '../service/UsersRolesService.js'; 
import { isValidEmail } from '../utils/IsValidEmail.js';
import { authorizeRoles, authenticateToken } from '../middleware/authentication.js';
import { createUserSchema, getUserSchema } from '../schemas/UserSchemas.js';
import { loginSchema } from '../schemas/authSchemas.js';
import { schemaReqValidation } from '../middleware/validation.js';


const authRouter = express.Router();

const requiredFields = ["user_name", "password"]

authRouter.post("/register", schemaReqValidation(createUserSchema), async(req, res, next)=>{
    try{
        const{ user_name, email, password} = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        
        const roleUser = await getRoleByName("user")

        const newUser = await createNewUser({user_name, email, passwordHash })
        
        const user_id = newUser.userId
        const role_id = roleUser.roleId

        await createNewUserRole({user_id, role_id})

        res.status(201).send(newUser)
    }catch(err){
        next(err)
    }
})

authRouter.post("/login", schemaReqValidation(loginSchema) ,async(req, res, next)=>{
    const {email, password} = req.body
    const user = await getUserbyEmail(email)
    
    const passwordOk = await bcrypt.compare(password, user.password)
    if (!passwordOk) return res.status(400).send("Credenciales invalidas")

    const roles = await getAllRolesFromUser(user.userId)

    const token = jwt.sign({email, roles: roles}, process.env.JWT_SECRET, {expiresIn: "1h"})

    res.status(200).send(token)
})


authRouter.get("/admin/dashboard", authenticateToken, authorizeRoles("admin"), (req, res, next)=>{
    res.json("Entras al admin dashboard")
})

export default authRouter