export async function createUserRoleModel(userRoleDTO){
    return {
        "userId" : userRoleDTO.user_id,
        "roleId" : userRoleDTO.role_id 
    }
}

export async function createPrimaryKeysUserRole(userRoleDTO){
    return {
        "userId" : userRoleDTO.user_id,
        "roleId" : userRoleDTO.role_id
    }
}

export async function updateUserRolesModel(userRolesDTO){
    return {
        "userId" : userRolesDTO.user_id,
        "rolesIds" : userRolesDTO.roles_ids
    }
}