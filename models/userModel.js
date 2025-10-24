export function validatePassword(password){
    if(password.length < 6){
        return false
    }
    return true
}

export async function createUser(userDTO){
    return {
        "userName" : userDTO.user_name,
        "email": userDTO.email,
        "password": userDTO.password,
        "idRole" : userDTO.idRole
    }
}

export async function updateUser(userDTO){
    return{
        "userName" : userDTO.user_name,
        "email" : userDTO.email,
        "idRole" : userDTO.id_role
    }
}

export function getUserWithoutPassword(user){
    if(!user) return null
    const {password, ...userWithoutPassword } = user
    return userWithoutPassword
}