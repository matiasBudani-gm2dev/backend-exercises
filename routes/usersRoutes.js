import express from 'express';
const userRouter = express.Router();

import { getAllUsersInfo, getById, createNewUser, deleteUser, updateUserComplete, updateUserPartial } from '../service/UserService.js';

//utils
import { validateRequiredFiles } from '../utils/ValidateRequieredFiles.js';
import {isValidEmail} from '../utils/IsValidEmail.js';
import { validateAtLeastOneField } from '../utils/ValidateAtLeastOneField.js';


const requiredFields = ["name", "email"]


userRouter.get('/', (req, res, next ) => {
    try{
        const users = getAllUsersInfo()
        res.status(200).send(users)
    }
    catch(error){
        next(error)
    }
})

userRouter.get('/:id', (req, res, next) => {
    try{
        const id = (Number(req.params.id))
        const user = getById(id)
        res.status(200).send(user)
    }catch(error){
        next(error)
    }
})


userRouter.post('/', (req, res, next) => {
    try{
        const {name, email, password} = req.body;
        if(!validateRequiredFiles(req, [...requiredFields, "password"])){
            res.status(400).send("Missing data")  
            return  
        }
        if(!isValidEmail(email)){
            res.status(400).send("Invalid email")
            return
        }
        
        const user = createNewUser({name, email, password})
        res.status(201).send(user)
        
    }catch(error){
        next(error)
    }
})


userRouter.put('/:id', (req, res, next) => {
    try{
        const id = Number(req.params.id)
        const {name, email} = req.body;
        if(!validateRequiredFiles(req, requiredFields)){
            res.status(400).send("Missing data")    
            return
        }
        if(!isValidEmail(email)){
            res.status(400).send("Invalid email")
            return
        }

        const user = updateUserComplete(id, {name, email})
        res.status(200).send(user)
        
    }catch(error){
        next(error)
    }
})


userRouter.patch('/:id', (req, res, next) => {
    try{   
        const id = Number(req.params.id)
        const {name, email} = req.body;
        if(!validateAtLeastOneField(req, requiredFields)){
            res.status(400).send("Missing data")    
            return
        }
        if(email && !isValidEmail(email)){
            res.status(400).send("Invalid email")
            return
        }
            const user = updateUserPartial(id, {name, email})
            res.status(200).send(user)
        
    }catch(error){
        next(error)
    }
})

userRouter.delete('/:id', (req, res, next) => { 
    try{ 
        const id = Number(req.params.id)
        const user = deleteUser(id)
        res.status(200).send(user)
     }
    catch(error){
        next(error)
    }
})

export default userRouter;
