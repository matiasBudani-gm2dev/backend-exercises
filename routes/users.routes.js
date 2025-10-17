import express from 'express';
const userRouter = express.Router();


//repository
import * as userRepository from "../repository/users.repository.js";

//model
import { createUser, getUserWithoutPassword, getUsersWithoutPassword } from
"../models/user.model.js";

//utils
import { validateRequiredFiles } from '../utils/validateRequieredFiles.js';
import {isValidEmail} from '../utils/isValidEmail.js';
import {isValidPassword} from '../utils/isValidPassword.js';
import { validateAtLeastOneField } from '../utils/validateAtLeastOneField.js';


userRouter.get('/', (req, res, next ) => {
    try{
        const users = userRepository.findAll()
        const showUsers = getUsersWithoutPassword(users)
        res.status(200).send(showUsers)
    }
    catch(error){
        next(error)
    }
})

userRouter.get('/:id', (req, res) => {
    try{
        if(!userRepository.findUserById(Number(req.params.id))){
            res.status(404).send("Usuario no encontrado")
        }else{ 
            const user = userRepository.findUserById(Number(req.params.id))
            const showUser = getUserWithoutPassword(user)
            res.status(200).send(showUser)
        }
    }catch(error){
        next(error)
    }
})


userRouter.post('/', (req, res, next) => {
    try{
        const {nombre, email, password} = req.body;
        if(!validateRequiredFiles(req, ['nombre', 'email', 'password'])){
            res.status(400).send("Faltan datos")    
        }
        else if(!isValidEmail(email)){
            res.status(400).send("El mail no es valido")
        }
        else if(userRepository.existsByEmail(email)){
            res.status(409).send("El email ya está registrado")
        }
        else if(!isValidPassword(password)){
            res.status(400).send("La contraseña debe tener al menos 6 caracteres y ser una cadena de texto")
        }
        else{
            const user = createUser({nombre, email, password})
            userRepository.save(user)
            const showUser = getUserWithoutPassword(user)
            res.status(201).send(showUser)
        }
    }catch(error){
        next(error)
    }
})


userRouter.put('/:id', (req, res, next) => {
    try{
        if(!userRepository.findUserById(Number(req.params.id))){
            res.status(404).send("Usuario no encontrado")
        }else{ 
            const {nombre, email} = req.body;
            if(!validateRequiredFiles(req, ['nombre', 'email'])){
                res.status(400).send("Faltan datos")    
            }
            else if(!isValidEmail(email)){
                res.status(400).send("El mail no es valido")
            }
            else if(userRepository.existsByEmail(email)){
                res.status(409).send("El email ya está registrado")
            }
            else{
                const user = userRepository.updateUserById(Number(req.params.id), {nombre, email})
                const showUser = getUserWithoutPassword(user)
                res.status(200).send(showUser)
            }
        }
    }catch(error){
        next(error)
    }
})


userRouter.patch('/:id', (req, res, next) => {
    try{   
        if(!userRepository.findUserById(Number(req.params.id))){
            res.status(404).send("Usuario no encontrado")
        }else{ 
            const {nombre, email} = req.body;
            if(!validateAtLeastOneField(req, ['nombre', 'email'])){
                res.status(400).send("Faltan datos reales")    
            }
            else if(email && !isValidEmail(email)){
                res.status(400).send("El mail no es valido")
            }
            else if(userRepository.existsByEmail(email)){
                res.status(409).send("El email ya está registrado")
            }
            else{
                const user = userRepository.updateUserById(Number(req.params.id), {nombre, email})
                const showUser = getUserWithoutPassword(user)
                res.status(200).send(showUser)
            }
        }
    }catch(error){
        next(error)
    }
})

userRouter.delete('/:id', (req, res, next) => { 
    try{ 
        if(!userRepository.findUserById(Number(req.params.id))){
            res.status(404).send("Usuario no encontrado")
        }
        else{
            userRepository.deleteUserById(Number(req.params.id))
            const user = findUserById(Number(req.params.id))
            const showUser = getUserWithoutPassword(user)
            res.status(200).send(showUser)
        }
     }
    catch(error){
        next(error)
    }
})

export default userRouter;
