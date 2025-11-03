import { save, updateById, deleteById } from "./BaseRepository.js"

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
    return baseRepository.findOne(Roles, name)
}

export async function saveRole(role){
   return baseRepository.create(Roles, role)
}

export async function updateRoleById(id, newUserData){
    return updateById(id, newRoleData, rolesTable.tableName, rolesTable.tablePK)
}

export async function deleteRoleById(id){
    deleteById(id, rolesTable.tableName, rolesTable.tablePK)
}