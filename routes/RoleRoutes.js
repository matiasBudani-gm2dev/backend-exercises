import express from 'express';
const roleRouter = express.Router();

import { createNewRole, getAllRolesInfo, getRoleById, updateRoleComplete, updateRolePartial, deleteRole } from '../service/RolesService.js';
import { validateRequiredFiles } from '../utils/ValidateRequieredFiles.js';
import { validateAtLeastOneField } from '../utils/ValidateAtLeastOneField.js';

const requiredFields = ["role_name"]


roleRouter.get("/", async (req, res, next) =>{
    try{
        const roles = await getAllRolesInfo()
        res.status(200).send(roles)
    }catch(err){
        next(err)
    }
})

roleRouter.get("/:id", async (req, res, next)=>{
    try{
        const id = Number(req.params.id)
        const role = await getRoleById(id)
        res.status(200).send(role)
    }catch(err){
        next(err)
    }
})

roleRouter.post("/", async (req, res, next) =>{
    try{
        const {role_name} = req.body
        if(!validateRequiredFiles(req, requiredFields)){
            res.status(400).send("Missing data")
            return
        }
        const role = await createNewRole({role_name})
        res.status(201).send(role)
    }catch(err){
        next(err)
    }
})


roleRouter.put("/:id", async(req, res, next)=>{
    try{
        const id = Number(req.params.id)
        const {role_name} = req.body
        if(!validateRequiredFiles(req, requiredFields)){
            res.status(400).send("Missing data")
            return
        }
        const role = await updateRoleComplete(id, {role_name})
        res.status(200).send(role)
    }catch(err){
        next(err)
    }
    
})

roleRouter.patch("/:id", async(req, res, next)=>{
    try{
        const id = Number(req.params.id)
        const {role_name} = req.body
        if(!validateAtLeastOneField(req, requiredFields)){
            res.status(400).send("Missing data")
            return
        }
        const role = await updateRolePartial(id, {role_name})
        res.status(200).send(role)
    }catch(err){
        next(err)
    }
})

roleRouter.delete("/:id", async(req, res, next)=>{
    try{
        const id = Number(req.params.id)
        const rol = await deleteRole(id)
        res.status(200).send(rol)
    }catch(err){
        next(err)
    }
})

export default roleRouter