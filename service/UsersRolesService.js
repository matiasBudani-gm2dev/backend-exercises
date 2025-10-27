import {createError} from "../utils/CreateError.js"
import _ from "lodash"

import { createOrUpdateUserRole, createPrimaryKeysUserRole } from "../models/UserRoleModel.js"
import { findAllUsersWithSpecificRole, findAllRolesFromUser, saveUserRole, findAllUsersRoles, findUserRole } from "../repository/UsersRolesRepository.js"
import { findRoleById } from "../repository/RolesRepository.js"
import { findUserById } from "../repository/usersRepository.js"
import { updateUserRole } from "../repository/UsersRolesRepository.js"


export async function getAllUsersRoles(){
    return findAllUsersRoles()
}

export async function getUserRole(userRoleIds){


    const roleId = userRoleIds.role_id
    const userId = userRoleIds.user_id

    if(Number.isNaN(userId) || Number.isNaN(roleId)){
        throw createError(400, "Bad request", "Both ids have to be a number")
    }

    const user = await findUserById(userId)
    if(!user){
        throw createError(404, "Not found", "The user was not found")
    }

    const role = await findRoleById(roleId)
    if(!role){
        throw createError(404, "Not found", "The role was not found")
    }

    const newUserRole = await createPrimaryKeysUserRole(userRoleIds)

    const userRole = await findUserRole(newUserRole)
    if(!userRole){
        throw createError(404, "Not found", "User role wasn't found")
    }

    return userRole

}

export async function getAllUsersWithSpecificRoleInfo(roleId){
    if(Number.isNaN(roleId)){
        throw createError(400, "Bad request", "The id has to be a number")
    }
    const role = await findRoleById(roleId)
    if(!role){
        throw createError(404, "Not found", "The role was not found")
    }
    const users = await findAllUsersWithSpecificRole(roleId)
    return users
}

export async function getAllRolesFromUser(userId){
    if(Number.isNaN(userId)){
        throw createError(400, "Bad request", "The id has to be a number")
    }
    const user = await findUserById(userId)
    if(!user){
        throw createError(404, "Not found", "The role was not found")
    }
    const users = await findAllRolesFromUser(userId)
    return users
}

export async function createNewUserRole(userRoleData, userId){
    
    const roleId = userRoleData.role_id

    if(Number.isNaN(userId) || Number.isNaN(roleId)){
        throw createError(400, "Bad request", "Both ids have to be a number")
    }

    const user = await findUserById(userId)
    if(!user){
        throw createError(404, "Not found", "The role was not found")
    }
    const role = await findRoleById(roleId)
    if(!role){
        throw createError(404, "Not found", "The role was not found")
    }

    const newUserRole = await createOrUpdateUserRole(userRoleData)

    if(!newUserRole){
        throw createError(500, "Internal server error", "User role not created")
    }

    const usersRoles = await getAllUsersRoles()
    usersRoles.map((userRole)=>{
        if(_.isEqual(userRole, newUserRole)){
            throw createError(400, "Bad request", "User role already exists")
        }
    })

    await saveUserRole(newUserRole)

}

export async function updateNewUserRole(){

    const userId = userRoleData.user_id
    const roleId = userRoleData.role_id

    if(Number.isNaN(userId) || Number.isNaN(roleId)){
        throw createError(400, "Bad request", "Both ids have to be a number")
    }

    const user = await findUserById(userId)
    if(!user){
        throw createError(404, "Not found", "The role was not found")
    }
    const role = await findRoleById(roleId)
    if(!role){
        throw createError(404, "Not found", "The role was not found")
    }

    const newUserRole = await createOrUpdateUserRole(userRoleData)

    if(!newUserRole){
        throw createError(500, "Internal server error", "User role not created")
    }

    await updateUserRole(newUserRole)
}