import express from 'express';
const userRouter = express.Router();

import { getAllUsersInfo, getUserById, createNewUser, deleteUser, updateUserComplete, updateUserPartial } from '../service/UserService.js';

//utils
import { validateRequiredFiles } from '../utils/ValidateRequieredFiles.js';
import {isValidEmail} from '../utils/IsValidEmail.js';
import { validateAtLeastOneField } from '../utils/ValidateAtLeastOneField.js';


const requiredFields = ["user_name", "email", "id_role"]


userRouter.get('/', async (req, res, next ) => {
    try{
        const users = await getAllUsersInfo()
        res.status(200).send(users)
    }
    catch(error){
        next(error)
    }
})

userRouter.get('/:id', async (req, res, next) => {
    try{
        const id = (Number(req.params.id))
        const user = await getUserById(id)
        res.status(200).send(user)
    }catch(error){
        next(error)
    }
})


userRouter.post('/', async (req, res, next) => {
    try{
        const {user_name, email, password, id_role} = req.body
        if(!validateRequiredFiles(req, [...requiredFields, "password"])){
            res.status(400).send("Missing data")  
            return  
        }
        if(!isValidEmail(email)){
            res.status(400).send("Invalid email")
            return
        }
        const user = await createNewUser({user_name, email, password, id_role})
        res.status(201).send(user)
        
    }catch(error){
        next(error)
    }
})


userRouter.put('/:id', async (req, res, next) => {
    try{
        const id = Number(req.params.id)
        const {user_name, email, id_role} = req.body;
        if(!validateRequiredFiles(req, requiredFields)){
            res.status(400).send("Missing data")    
            return
        }
        if(!isValidEmail(email)){
            res.status(400).send("Invalid email")
            return
        }

        const user = await updateUserComplete(id, {user_name, email, id_role})
        res.status(200).send(user)
        
    }catch(error){
        next(error)
    }
})


userRouter.patch('/:id', async (req, res, next) => {
    try{   
        const id = Number(req.params.id)
        const {user_name, email, id_role} = req.body;
        if(!validateAtLeastOneField(req, requiredFields)){
            res.status(400).send("Missing data")    
            return
        }
        if(email && !isValidEmail(email)){
            res.status(400).send("Invalid email")
            return
        }
            const user = await updateUserPartial(id, {user_name, email, id_role})
            res.status(200).send(user)
        
    }catch(error){
        next(error)
    }
})

userRouter.delete('/:id', async (req, res, next) => { 
    try{ 
        const id = Number(req.params.id)
        const user = await deleteUser(id)
        res.status(200).send(user)
     }
    catch(error){
        next(error)
    }
})

export default userRouter;
