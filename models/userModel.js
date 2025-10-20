export function validatePassword(password){
    if(password.length < 6){
        return false
    }
    return true
}

export function createUser(userDTO){
    return {
        "name" : userDTO.name,
        "email": userDTO.email,
        "password": userDTO.password
    }
}

export function getUserWithoutPassword(user){
    if(!user) return null
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
}