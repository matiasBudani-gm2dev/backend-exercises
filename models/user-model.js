export function validatePassword(password){
    if(password.length < 6){
        return false
    }
    return true
}

export function createUser(userDTO){
    return {
        "nombre" : userDTO.nombre,
        "email": userDTO.email,
        "password": userDTO.password
    }
}

export function getUsersWithoutPassword(users){
    return users.map(({password, ...userWithoutPassword}) => userWithoutPassword)
}

export function getUserWithoutPassword(user){
    if(!user) return null
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
}