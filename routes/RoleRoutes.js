import express from 'express';
const roleRouter = express.Router();

import { createNewRole, getAllRolesInfo, getRoleById, updateRoleComplete, updateRolePartial, deleteRole } from '../service/RolesService.js';
import { validateRequiredFiles } from '../utils/ValidateRequieredFiles.js';
import { validateAtLeastOneField } from '../utils/ValidateAtLeastOneField.js';

import { schemaReqValidation, schemaResValidation } from '../middleware/validation.js';
import { getRoleSchema, createRoleSchema, updateCompleteRoleSchema, updatePartialRoleSchema } from '../schemas/rolesSchemas.js';


const requiredFields = ["role_name"]


roleRouter.get("/", async (req, res, next) =>{
    try{
        const roles = await getAllRolesInfo()
        roles.map(role=>{
            const isError = schemaResValidation(getRoleSchema, role)
            if(isError){
                res.status(400).send(isError)
                return
            }
        })
        res.status(200).send(roles)
    }catch(err){
        next(err)
    }
})

roleRouter.get("/:id", async (req, res, next)=>{
    try{
        const id = Number(req.params.id)
        const role = await getRoleById(id)
        const isError = schemaResValidation(getRoleSchema, role)
        if(isError){
            res.status(400).send(isError)
            return
        }
        res.status(200).send(role)
    }catch(err){
        next(err)
    }
})

roleRouter.post("/", schemaReqValidation(createRoleSchema) ,async (req, res, next) =>{
    try{
        const {role_name} = req.body
        const role = await createNewRole({role_name})
        const isError = schemaResValidation(getRoleSchema, role)
        if(isError){
            res.status(400).send(isError)
            return
        }
        res.status(201).send(role)
    }catch(err){
        next(err)
    }
})


roleRouter.put("/:id", schemaReqValidation(updateCompleteRoleSchema),async(req, res, next)=>{
    try{
        const id = Number(req.params.id)
        const {role_name} = req.body

        const role = await updateRoleComplete(id, {role_name})

        const isError = schemaResValidation(getRoleSchema, role)
        if(isError){
            res.status(400).send(isError)
            return
        }

        res.status(200).send(role)
    }catch(err){
        next(err)
    }
    
})

roleRouter.patch("/:id", schemaReqValidation(updatePartialRoleSchema) ,async(req, res, next)=>{
    try{
        const id = Number(req.params.id)
        const {role_name} = req.body

        const role = await updateRolePartial(id, {role_name})

        const isError = schemaResValidation(getRoleSchema, role)
        if(isError){
            res.status(400).send(isError)
            return
        }

        res.status(200).send(role)
    }catch(err){
        next(err)
    }
})

roleRouter.delete("/:id", async(req, res, next)=>{
    try{
        const id = Number(req.params.id)

        const role = await deleteRole(id)

        const isError = schemaResValidation(getRoleSchema, role)
        if(isError){
            res.status(400).send(isError)
            return
        }
        
        res.status(200).send(role)
    }catch(err){
        next(err)
    }
})

export default roleRouter