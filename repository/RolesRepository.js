import { pool } from "../boostrap.js"
import { findByField, save, updateById, deleteById } from "./BaseRepository.js"

import Roles from "../models/RoleModel.js"
import baseRepository from "./BaseRepository.js"

const rolesTable = {
    tableName : "roles",
    tablePK: "roleId"
}

export async function findAllRoles(){
    return baseRepository.findAll(Roles)
}

export async function findRoleById(id){
    return baseRepository.findByPk(Roles, id)
}

export async function findRoleByName(name){
    return findByField(name, rolesTable.tableName, "roleName")
}

export async function saveRole(user){
   return save(user, rolesTable.tableName)
}

export async function updateRoleById(id, newUserData){
    return updateById(id, newUserData, rolesTable.tableName, rolesTable.tablePK)
}

export async function deleteRoleById(id){
    deleteById(id, rolesTable.tableName, rolesTable.tablePK)
}