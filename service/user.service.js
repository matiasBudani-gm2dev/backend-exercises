import {createError} from "/Users/gm2academy/Documents/GitHub/backend-exercises/utils/createError.js";

import { createUser, validatePassword } from "../models/user-model.js";
import { findAll, createUserForDB ,existsByEmail, findUserById, save, updateUserById, deleteUserById } from "../repository/users.repository.js";
import { getUserWithoutPassword } from "../models/user-model.js";

export function getUsersWithoutPassword(users){
    return users.map(({password, ...userWithoutPassword}) => userWithoutPassword)
}

export function getAllUsersInfo(){
    const users = findAll()
    return getUsersWithoutPassword(users)
}

export function getById(id){
    const user = findUserById(id)
    if(!user){
        throw createError(404, "Usuario no encontrado", "Not Found")
    }
    return getUserWithoutPassword(user)

}

export function createNewUser(userData){
    if(!validatePassword(userData.password)){
        throw createError(400, "Bad Request", "La contrasenia debe tener un minimo de 6 caracteres")
    }
    if(existsByEmail(userData.email)){
        throw createError(409, "Conflict Error", "El email ya existe" )
    }

    const newUser = createUser(userData)

    const newUserForDB = createUserForDB(newUser)

    save(newUserForDB)
    
    return getUserWithoutPassword(newUserForDB)
}

export function updateUserComplete(id, userData){
    if(existsByEmail(userData.email)){
        throw createError(409, "Conflict Error", "El email ya existe" )
    }
    if(!findUserById(id)){
        throw createError(404, "Not found", "El usuario no existe")
    }

    const user = updateUserById(id, userData)

    return getUserWithoutPassword(user)
}

export function updateUserPartial(id, userData){
    if(existsByEmail(userData.email)){
        throw createError(409, "Conflict Error", "El email ya existe" )
    }
    if(!findUserById(id)){
        throw createError(404, "Not found", "El usuario no existe")
    }

    for (const [key, value] of Object.entries(userData)) {
        if(value === undefined){
            delete userData[key]
        }
    }

    const user = updateUserById(id, userData)

    return getUserWithoutPassword(user)

}

export function deleteUser(id){
    const user = getById(id)
    deleteUserById(id)
    return user
}