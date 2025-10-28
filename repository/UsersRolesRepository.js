import pool from "../boostrap.js"
import { findAll, findWithJoin ,findById, save, updateById, deleteById } from "./BaseRepository.js"

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
    return findAll(usersRolesTableName)
}

export async function findUserRole(userRoleIds){

    const userId = userRoleIds.userId
    const roleId = userRoleIds.roleId


    const [rows] = await pool.query(`
        SELECT * from ${usersRolesTableName} 
        WHERE userId = ?
        AND roleId = ?
        `, [userId, roleId])
    
    return rows[0]
}

export async function findAllUsersWithSpecificRole(roleId){
    return findWithJoin(usersTableName, usersRolesTableName, tableUserPK, tableUserPK, tableRolePK, roleId)
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