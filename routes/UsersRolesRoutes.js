import express from 'express';
const userRolesRouter = express.Router();

import { getAllUsersWithSpecificRoleInfo, getAllRolesFromUser, createNewUserRole, getAllUsersRoles, updateNewUserRole, getUserRole } from '../service/UsersRolesService.js';

import { validateRequiredFiles } from '../utils/ValidateRequieredFiles.js';

const primaryKeys = ["user_id", "role_id"]
const requiredFields = ["role_id"]

userRolesRouter.get("/", async(req, res, next)=>{
    try{
        const usersRoles = await getAllUsersRoles()
        res.status(200).send(usersRoles)
    }catch(err){
        next(err)
    }
})

userRolesRouter.get("/:id", async(req, res, next)=>{
    try{
        const user_id = Number(req.params.id)
        const {role_id} = req.body
        if(!validateRequiredFiles(req, requiredFields)){
            res.status(400).send("Missing data")  
            return  
        }
        const userRole = await getUserRole({role_id, user_id})
        res.status(200).send(userRole)
        
    }catch(err){
        next(err)
    }
})

userRolesRouter.get("/users/:id", async (req, res, next)=>{
    try{
        const id = Number(req.params.id)
        const users = await getAllUsersWithSpecificRoleInfo(id)
        res.status(200).send(users)
    }catch(err){
        next(err)
    }
})


userRolesRouter.get("/roles/:id", async(req, res, next)=>{
    try{
        const id = Number(req.params.id)
        const roles = await getAllRolesFromUser(id)
        res.status(200).send(roles)
    }catch(err){
        next(err)
    }
})

userRolesRouter.post("/:id", async(req, res, next)=>{
    try{
        const id = req.params.id
        const {role_id} = req.body
        if(!validateRequiredFiles(req, requiredFields)){
            res.status(400).send("Missing data")  
            return  
        }
        const userRole = await createNewUserRole({role_id, user_id})
        res.status(201).send(userRole)

    }catch(err){
        next(err)
    }
})

userRolesRouter.put("/", async (req, res, next)=>{
    try{
        const{role_id, user_id} = req.body
        if(!validateRequiredFiles(req, requiredFields)){
            res.status(400).send("Missing data")
            return
        }
        const userRole = await updateNewUserRole({role_id, user_id})
        res.status(200).send(userRole)
    }catch(err){
        next(err)
    }
})

export default userRolesRouter