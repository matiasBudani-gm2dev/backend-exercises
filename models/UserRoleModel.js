export async function createOrUpdateUserRole(userRoleDTO){
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