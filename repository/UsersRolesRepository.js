import { pool } from "../boostrap.js"
import {findWithJoin, findByField, save, updateById, deleteById } from "./BaseRepository.js"

import baseRepository from "./BaseRepository.js";
import UserRole from "../models/UserRoleModel.js";
import Users from "../models/UserModel.js";
import Roles from "../models/RoleModel.js";


const usersRolesTable = {
    usersTableName : "users",
    rolesTableName: "roles",
    usersRolesTableName : "user_roles",
    tableUserPK: "userId",
    tableRolePK : "roleId"
}

const {
    usersTableName,
    rolesTableName,
    usersRolesTableName,
    tableUserPK,
    tableRolePK
  } = usersRolesTable;


  
export async function findAllUsersRoles(){
    return baseRepository.findAll(UserRole)
}

export async function findUserRole(userRoleIds){
    return baseRepository.findOne(UserRole, userRoleIds)
}

export async function findAllUsersWithSpecificRole(roleId){
    console.log(await Users.findAll())
    return findWithJoin(Users, UserRole, tableRolePK, roleId)
}

export async function findAllRolesFromUser(userId){
    return findWithJoin(rolesTableName, usersRolesTableName, tableRolePK, tableRolePK, tableUserPK, userId)
}

export async function saveUserRole(userRole){
    return save(userRole, usersRolesTableName)
}

export async function updateUserRoles(userId, userRoles){


    await pool.query(`
        DELETE FROM ${usersRolesTableName}
        WHERE userId = ?    
    `, [userId])
    
    for(const role of userRoles){
        await pool.query(`
            INSERT INTO ${usersRolesTableName}
            (${tableUserPK}, ${tableRolePK})
            VALUES(?, ?)
        `, [userId, role])
    }
    
    
}