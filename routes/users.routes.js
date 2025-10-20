import express from 'express';
const userRouter = express.Router();

import { getAllUsersInfo, getById, createNewUser, deleteUser, updateUserComplete, updateUserPartial } from '../service/user.service.js';

//utils
import { validateRequiredFiles } from '../utils/validateRequieredFiles.js';
import {isValidEmail} from '../utils/isValidEmail.js';
import { validateAtLeastOneField } from '../utils/validateAtLeastOneField.js';


const requiredFields = ["nombre", "email"]


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
        const {nombre, email, password} = req.body;
        if(!validateRequiredFiles(req, [...requiredFields, "password"])){
            res.status(400).send("Faltan datos")  
            return  
        }
        if(!isValidEmail(email)){
            res.status(400).send("El mail no es valido")
            return
        }
        
        const user = createNewUser({nombre, email, password})
        res.status(201).send(user)
        
    }catch(error){
        next(error)
    }
})


userRouter.put('/:id', (req, res, next) => {
    try{
        const id = Number(req.params.id)
        const {nombre, email} = req.body;
        if(!validateRequiredFiles(req, requiredFields)){
            res.status(400).send("Faltan datos")    
            return
        }
        if(!isValidEmail(email)){
            res.status(400).send("El mail no es valido")
            return
        }

        const user = updateUserComplete(id, {nombre, email})
        res.status(200).send(user)
        
    }catch(error){
        next(error)
    }
})


userRouter.patch('/:id', (req, res, next) => {
    try{   
        const id = Number(req.params.id)
        const {nombre, email} = req.body;
        if(!validateAtLeastOneField(req, requiredFields)){
            res.status(400).send("Faltan datos reales")    
            return
        }
        if(email && !isValidEmail(email)){
            res.status(400).send("El mail no es valido")
            return
        }
            const user = updateUserPartial(id, {nombre, email})
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
