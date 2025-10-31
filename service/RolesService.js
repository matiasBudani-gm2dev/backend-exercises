import {createError} from "../utils/CreateError.js"

import { findAllRoles, findRoleById, findRoleByName, saveRole, updateRoleById, deleteRoleById } from "../repository/RolesRepository.js";
import { createOrUpdateRole } from "../models/RoleModel.js";

export async function getAllRolesInfo(){
    return findAllRoles()
}

export async function getRoleById(id){
    
    if(Number.isNaN(id)){
        throw createError(400, "Bad request", "The id has to be a number")
    }

    const role = await findRoleById(id)
    if(!role){
        throw createError(404, "Not found", "Role not found")
    }
    return role
}

export async function getRoleByName(name){
    const role = await findRoleByName(name)
    if(!role){
        throw createError(404, "Not found", "Role not found")
    }
    return role
}

export async function createNewRole(roleData){
    const newRole = await createOrUpdateRole(roleData)

    if(!newRole){
        throw createError(500, "Internal server error", "Role was not created")
    }

    const roleCreatedId = await saveRole(newRole)

    const createdRole = await getRoleById(roleCreatedId)

    return createdRole
}

export async function updateRoleComplete(id, roleData){

    if(Number.isNaN(id)){
        throw createError(400, "Bad request", "The id has to be a number")
    }

    if(!(await findRoleById(id))){
        throw createError(404, "Not found", "Role not found")
    }

    const newRole = await createOrUpdateRole(roleData)

    if(!newRole){
        throw createError(500, "Internal server error", "User was not updated")
    }

    updateRoleById(id, newRole)

    const updatedRole = await getRoleById(id)

    return updatedRole
}

export async function updateRolePartial(id, roleData){

    if(Number.isNaN(id)){
        throw createError(400, "Bad request", "The id has to be a number")
    }

    if(!(await findRoleById(id))){
        throw createError(404, "Not found", "Role not found")
    }

    const newRole = await createOrUpdateRole(roleData)

    if(!newRole){
        throw createError(500, "Internal server error", "User was not updated")
    }

    for (const [key, value] of Object.entries(roleData)) {
        console.log(key)
        console.log(value)
        if(value === undefined){
            delete userData[key]
        }
    }

    updateRoleById(id, newRole)

    const updatedRole = await getRoleById(id)

    return updatedRole
}

export async function deleteRole(id){

    if(Number.isNaN(id)){
        throw createError(400, "Bad request", "The id has to be a number")
    }

    const role = getRoleById(id)
    deleteRoleById(id)
    return role
}