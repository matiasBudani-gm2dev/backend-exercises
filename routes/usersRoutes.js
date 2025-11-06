import express from 'express';
import bcrypt from "bcryptjs";
import Joi from 'joi';

const userRouter = express.Router();

import { getAllUsersInfo, getUserById, createNewUser, deleteUser, updateUserComplete, updateUserPartial } from '../service/userService.js';

import { schemaReqValidation, schemaResValidation } from '../middleware/validation.js';
import { getUserSchema, createUserSchema, updateCompleteUserSchema, updatePartialUserSchema } from '../schemas/userSchemas.js';

userRouter.get('/' ,async (req, res, next ) => {
    try{
        console.log("hiciste un get de usuarios")
        const users = await getAllUsersInfo()
        users.map(user=>{
            const isError = schemaResValidation(getUserSchema, user)
            if(isError){
                res.status(500).send(isError)
                return
            }
        })
        res.status(200).send(users)
    }
    catch(error){
        next(error)
    }
})

userRouter.get('/:id', async (req, res, next) => {
    try{
        const id = (Number(req.params.id))
        console.log("hiciste un get del usuario", id)
        const user = await getUserById(id)
        const isError = schemaResValidation(getUserSchema, user)
        if(isError){
            res.status(400).send(isError)
            return
        }
        res.status(200).send(user)
    }catch(error){
        next(error)
    }
})

userRouter.post('/',
    schemaReqValidation(createUserSchema),
        async (req, res, next) => {     
        try{
            console.log("hiciste un post de usuario")
            const {user_name, email, password} = req.body
            const passwordHash = await bcrypt.hash(password, 10)
            const user = await createNewUser({user_name, email, passwordHash })

            const isError = schemaResValidation(getUserSchema, user)
            if(isError){
                res.status(400).send(isError)
                return
            }
            res.status(201).send(user)
        }catch(error){
            next(error)
        }
    }
)


userRouter.put('/:id', schemaReqValidation(updateCompleteUserSchema), async (req, res, next) => {
    try{
        const id = Number(req.params.id)
        const {user_name, email } = req.body;

        const user = await updateUserComplete(id, {user_name, email })
        const isError = schemaResValidation(getUserSchema, user)
        if(isError){
            res.status(400).send(isError)
            return
        }    
        res.status(200).send(user)    
    }catch(error){
        next(error)
    }
})


userRouter.patch('/:id', schemaReqValidation(updatePartialUserSchema), async (req, res, next) => {
    try{   
        const id = Number(req.params.id)
        const {user_name, email } = req.body;

        const user = await updateUserPartial(id, {user_name, email})

        const isError = schemaResValidation(getUserSchema, user)
        if(isError){
            res.status(400).send(isError)
            return
        }     
        res.status(200).send(user)   
    }catch(error){
        next(error)
    }
})

userRouter.delete('/:id', async (req, res, next) => { 
    try{ 
        const id = Number(req.params.id)
        const user = await deleteUser(id)
        const isError = schemaResValidation(getUserSchema, user)
        if(isError){
            res.status(400).send(isError)
            return
        }
        res.status(200).send(user)
    }
    catch(error){
        next(error)
    }
})

export default userRouter;
