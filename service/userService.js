import {createError} from "../utils/CreateError.js"

import { createUser, validatePassword, updateUser, getUserWithoutPassword} from "../models/UserModel.js";
import { findAllUsers ,findByEmail, findUserById, saveUser, updateUserById, deleteUserById } from "../repository/usersRepository.js";

export async function getUsersWithoutPassword(users){
    return users.map(({password, ...userWithoutPassword}) => userWithoutPassword)
}

export async function getAllUsersInfo(){
    const users = await findAllUsers()
    return getUsersWithoutPassword(users)
}

export async function getUserById(id){
    const user = await findUserById(id)
    if(!user){
        throw createError(404, "Not found", "User not Found")
    }
    return getUserWithoutPassword(user)

}

export async function createNewUser(userData){
    if(!validatePassword(userData.password)){
        throw createError(400, "Bad Request", "The password needs to have at least 6 characters")
    }

    const userFound = await findByEmail(userData.email)

    if(userFound){
        throw createError(409, "Conflict Error", "El email ya existe" )
    }

    const newUser = await createUser(userData)

    if(!newUser) {
        throw createError(500, 'Internal Server Error', "User not created")
    }

    const userCreatedId = await saveUser(newUser) //saveUser() devuelve el ID del usuario creado

    const safeUser = await getUserById(userCreatedId)

    return safeUser
}

export async function updateUserComplete(id, userData){

    const userFound = await findByEmail(userData.email)

    if(userFound){
        throw createError(409, "Conflict Error", "Existing email" )
    }
    if(!(await findUserById(id))){
        throw createError(404, "Not found", "User not found")
    }


    const user = await updateUser(userData)

    await updateUserById(id, user)

    const safeUser = await getUserById(id)

    return safeUser

}


export async function updateUserPartial(id, userData){


    const userFound = await findByEmail(userData.email)

    if(userFound){
        throw createError(409, "Conflict Error", "Existing email" )
    }
    if(!(await findUserById(id))){
        throw createError(404, "Not found", "User not found")
    }
    const user = await updateUser(userData)


    for (const [key, value] of Object.entries(user)) {
        if(value === undefined){
            delete user[key]
        }
    }

    await updateUserById(id, user)

    const safeUser = await getUserById(id)

    return safeUser

}

export async function deleteUser(id){
    const user = await getUserById(id)
    await deleteUserById(id)
    return user
}