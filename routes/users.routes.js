import express from 'express';
const userRouter = express.Router();

import {getAllUsers, findUserById ,addUser, updateUserById, deleteUserById, emailExists } from '../data/users.js';

import { validateRequiredFiles } from '../utils/validateRequieredFiles.js';
import {isValidEmail} from '../utils/isValidEmail.js';
import {isValidPassword} from '../utils/isValidPassword.js';


userRouter.get('/', (req, res, next ) => {
    try{
        const user = getAllUsers()
        const showUser = user.map(({id, createdAt, nombre, email}) => ({id, createdAt, nombre,  email}))
        res.status(200).send(showUser)
    }
    catch(error){
        next(error)
    }
})

userRouter.get('/:id', (req, res) => {
    try{
        if(!findUserById(Number(req.params.id))){
            res.status(404).send("Usuario no encontrado")
        }else{ 
            const user = findUserById(Number(req.params.id))
            const showUser = ({id, createdAt, nombre, email}) => ({id, createdAt, nombre, email})
            res.status(200).send(showUser(user))
        }
    }catch(error){
        next(error)
    }
})


userRouter.post('/', (req, res, next) => {
    try{
        const id = Date.now();
        const createdAt = new Date().toISOString()
        const {nombre, email, password} = req.body;
        if(!validateRequiredFiles(req, ['nombre', 'email', 'password'])){
            res.status(400).send("Faltan datos")    
        }
        else if(!isValidEmail(email)){
            res.status(400).send("El mail no es valido")
        }
        else if(!isValidPassword(password)){
            res.status(400).send("La contraseña debe tener al menos 6 caracteres y ser una cadena de texto")
        }
        else{
            addUser({id, createdAt, nombre,  email, password})
            const showUser = {id, createdAt, nombre, email}
            res.status(201).send(showUser)
        }
    }catch(error){
        next(error)
    }
})


userRouter.put('/:id', (req, res, next) => {
    try{
        if(!findUserById(Number(req.params.id))){
            res.status(404).send("Usuario no encontrado")
        }else{ 
            const {nombre, email} = req.body;
            if(!validateRequiredFiles(req, ['nombre', 'email'])){
                res.status(400).send("Faltan datos")    
            }
            else if(!isValidEmail(email)){
                res.status(400).send("El mail no es valido")
            }
            else{
                updateUserById(Number(req.params.id), {nombre, email})
                const user = findUserById(Number(req.params.id))
                const showUser = ({id, createdAt, nombre, email}) => ({id, createdAt, nombre, email})
                res.status(200).send(showUser(user))
            }
        }
    }catch(error){
        next(error)
    }
})


userRouter.patch('/:id', (req, res, next) => {
    try{   
        if(!findUserById(Number(req.params.id))){
            res.status(404).send("Usuario no encontrado")
        }else{ 
            const {nombre, email} = req.body;
            if(!validateRequiredFiles(req, ['nombre', 'email'])){
                res.status(400).send("Faltan datos")    
            }
            else if(!isValidEmail(email)){
                res.status(400).send("El mail no es valido")
            }
            else{
                updateUserById(Number(req.params.id), {nombre, email})
                const user = findUserById(Number(req.params.id))
                const showUser = ({id, createdAt, nombre, email}) => ({id, createdAt, nombre, email})
                res.status(200).send(showUser(user))
            }
        }
    }catch(error){
        next(error)
    }
})

userRouter.delete('/:id', (req, res, next) => { 
    try{ 
        if(!findUserById(Number(req.params.id))){
            res.status(404).send("Usuario no encontrado")
        }
        else{
            deleteUserById(Number(req.params.id))
            const user = findUserById(Number(req.params.id))
            const showUser = ({id, createdAt, nombre, email}) => ({id, createdAt, nombre, email})
            res.status(200).send(showUser(user))
        }
     }
    catch(error){
        next(error)
    }
})

export default userRouter;
