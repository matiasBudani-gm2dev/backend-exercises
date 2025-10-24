import pool from "../boostrap.js"
import { findAll, findById, save, updateById, deleteById } from "./BaseRepository.js"

const rolesTable = {
    tableName : "roles",
    tablePK: "roleId"
}

export async function findAllRoles(){
    return findAll(rolesTable.tableName)
}

export async function findRoleById(id){
    return findById(id, rolesTable.tableName, rolesTable.tablePK)
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