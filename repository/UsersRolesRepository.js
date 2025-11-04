import baseRepository from "./BaseRepository.js";
import {Users, Roles, UserRole} from "../models/index.js";


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
    return baseRepository.findWithJoin(Users, UserRole, tableRolePK, roleId)
}

export async function findAllRolesFromUser(userId){
    return baseRepository.findWithJoin(Roles, UserRole, tableUserPK, userId)
}

export async function saveUserRole(userRole){
    return baseRepository.create(UserRole, userRole)
}

export async function updateUserRoles(userId, userRoles){

    await baseRepository.destroy(UserRole, tableUserPK, userId)

    for(const role of userRoles){
        await baseRepository.create(UserRole, role)
    }
}