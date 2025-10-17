import {createError} from "/Users/gm2academy/Documents/GitHub/backend-exercises/utils/createError.js";

import { createUser, getUsersWithoutPassword, validatePassword } from "../models/user-model.js";
import { findAll, createSavedUser ,existsByEmail, findUserById, save, updateUserById, deleteUserById } from "../repository/users.repository.js";
import { getUserWithoutPassword } from "../models/user-model.js";

export function getAllUsersInfo(){
    const users = findAll()
    const showUsers = getUsersWithoutPassword(users)
    return showUsers
}

export function getById(id){
    const user = getUserById(id)
    if(!user){
        throw createError(404, "Usuario no encontrado", "Not Found")
    }
    const showUser = getUserWithoutPassword(user)
    return showUser
}

export function createNewUser(userData){
    if(!validatePassword(userData.password)){
        throw createError(400, "Bad Request", "La contrasenia debe tener un minimo de 6 caracteres")
    }
    else if(existsByEmail(userData.email)){
        throw createError(409, "Conflict Error", "El email ya existe" )
    }

    const userCreated = createUser(userData)

    const savedUser = createSavedUser(userCreated)

    save(savedUser)
    const safeUser = getUserWithoutPassword(savedUser)

    return safeUser
}

export function updateUserComplete(id, userData){
    if(existsByEmail(userData.email)){
        throw createError(409, "Conflict Error", "El email ya existe" )
    }
    else if(!findUserById(id)){
        throw createError(404, "Not found", "El usuario no existe")
    }


    const user = updateUserById(id, userData)

    const safeUser =  getUserWithoutPassword(user)
    return safeUser
}

export function deleteUser(id){

    const user = deleteUserById(id)
    if(!user){
        throw createError(404, "Not found", "El usuario no existe")
    }
    const safeUser = getUserWithoutPassword(user)
    return safeUser
}