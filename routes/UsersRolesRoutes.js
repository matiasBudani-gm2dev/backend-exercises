import express from 'express';
const userRolesRouter = express.Router();

import { getAllUsersWithSpecificRoleInfo, getAllRolesFromUser, createNewUserRole, getAllUsersRoles, updateNewUserRoles, getUserRole } from '../service/UsersRolesService.js';

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
        const user_id = Number(req.params.id)
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

userRolesRouter.put("/:id", async (req, res, next)=>{
    try{
        const user_id = Number(req.params.id)
        const {roles_ids} = req.body
        if(!validateRequiredFiles(req, ["roles_ids"])){
            res.status(400).send("Missing data")
            return
        }
        const userRole = await updateNewUserRoles({roles_ids, user_id})
        res.status(200).send(userRole)
    }catch(err){
        next(err)
    }
})


userRolesRouter.delete("/:id", async(req, res, next)=>{
    const user_id = Number(req.params.id)
    const user = await updateNewUserRoles({roles_ids: [], user_id})
    res.status(200).send(user)
})

export default userRolesRouter