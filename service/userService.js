import {createError} from "../utils/CreateError.js"

import { createUser, validatePassword } from "../models/UserModel.js";
import { findAll, createUserForDB ,existsByEmail, findUserById, save, updateUserById, deleteUserById } from "../repository/usersRepository.js";
import { getUserWithoutPassword } from "../models/UserModel.js";

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
        throw createError(404, "User not found", "Not Found")
    }
    return getUserWithoutPassword(user)

}

export function createNewUser(userData){
    if(!validatePassword(userData.password)){
        throw createError(400, "Bad Request", "The password needs to have at least 6 characters")
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
        throw createError(409, "Conflict Error", "Existing email" )
    }
    if(!findUserById(id)){
        throw createError(404, "Not found", "User not found")
    }

    const user = updateUserById(id, userData)

    return getUserWithoutPassword(user)
}

export function updateUserPartial(id, userData){
    if(existsByEmail(userData.email)){
        throw createError(409, "Conflict Error", "Existing email" )
    }
    if(!findUserById(id)){
        throw createError(404, "Not found", "User not found")
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