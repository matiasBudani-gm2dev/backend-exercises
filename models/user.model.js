export function createUser(userData){
    const id = Date.now()
    const createdAt = new Date().toISOString()


    return {id, createdAt, ...userData} 

}

export function getUsersWithoutPassword(users){
    return users.map(({password, ...userWithoutPassword}) => userWithoutPassword)
}

export function getUserWithoutPassword(user){
    if(!user) return null
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
}