import {createError} from "../utils/CreateError.js"

import { createUserRoleModel, createPrimaryKeysUserRole, updateUserRolesModel } from "../models/UserRoleModel.js"
import { findAllUsersWithSpecificRole, findAllRolesFromUser, saveUserRole, findAllUsersRoles, findUserRole, updateUserRoles } from "../repository/UsersRolesRepository.js"
import { getUserById, getUsersWithoutPassword } from "./UserService.js"
import { getRoleById } from "./RolesService.js"


export async function getAllUsersRoles(){
    return findAllUsersRoles()
}

export async function getUserWithRoles(userId){
    const user = await getUserById(userId)

    const roles = await findAllRolesFromUser(userId)

    const userWithRoles = {...user, roles}

    return userWithRoles
}


export async function getUserRole(userRoleIds){


    const roleId = userRoleIds.role_id
    const userId = userRoleIds.user_id

    if(Number.isNaN(userId) || Number.isNaN(roleId)){
        throw createError(400, "Bad request", "Both ids have to be a number")
    }

    const user = await getUserById(userId)
    if(!user){
        throw createError(404, "Not found", "The user was not found")
    }

    const role = await getRoleById(roleId)
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
    const role = await getRoleById(roleId)
    if(!role){
        throw createError(404, "Not found", "The role was not found")
    }
    const users = await findAllUsersWithSpecificRole(roleId)
    return getUsersWithoutPassword(users)
}

export async function getAllRolesFromUser(userId){
    if(Number.isNaN(userId)){
        throw createError(400, "Bad request", "The id has to be a number")
    }
    const user = await getUserById(userId)
    if(!user){
        throw createError(404, "Not found", "The role was not found")
    }
    const users = await findAllRolesFromUser(userId)
    return getUsersWithoutPassword(users)
}

export async function createNewUserRole(userRoleData){
    
    const roleId = userRoleData.role_id
    const userId = userRoleData.user_id

    if(Number.isNaN(userId) || Number.isNaN(roleId)){
        throw createError(400, "Bad request", "Both ids have to be a number")
    }

    const newUserRole = await createUserRoleModel(userRoleData)

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


    const userWithRoles = getUserWithRoles(userId)

    return userWithRoles

}

export async function updateNewUserRoles(userRoleData){

    const newUserRoles = await updateUserRolesModel(userRoleData)

    const userId = newUserRoles.userId
    const rolesIds = newUserRoles.rolesIds


    if(!Array.isArray(rolesIds)){
        throw createError(400, "Bad request", "Roles ids must be an array")
    }

    if(Number.isNaN(userId)){
        throw createError(400, "Bad request", "User id has to be a number")
    }


    for (const r of rolesIds) {
        const roleIdNum = Number(r)
        if (Number.isNaN(roleIdNum)) {
            throw createError(400, "Bad request", "All roles id have to be a number")
        }
        const role = await getRoleById(roleIdNum)
        if (!role) {
            throw createError(404, "Not found", "The role was not found")
        }
    }


    const rolesIdsNums = rolesIds.map((roleId) => Number(roleId))



    const user = await getUserById(userId)
    if(!user){
        throw createError(404, "Not found", "The user was not found")
    }



    await updateUserRoles(userId, rolesIdsNums)

    const userWithRoles = getUserWithRoles(userId)

    return userWithRoles
}