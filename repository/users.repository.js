let users = []

export function findAll(){
    return users
}

export function findUserById(id){
    return users.find(user => user.id === id)
}

export function findByEmail(email){
    if(users.find(user => user.email === email)){
        return "User founded"
    }
    return undefined
}

export function existsByEmail(email){
    if(users.some(user => user.email === email)){
        return "User founded"
    }

    return null
}

export function createUserForDB(user){
    const id = Date.now()
    const createdAt = new Date().toISOString()

    const newUser = {id, createdAt, ...user}
    return newUser
}

export function save(user){
    users.push(user)
    return true
}

export function updateUserById(id, newUserData){
    
    const user = findUserById(id)

    Object.assign(user, newUserData)

    return user

}

export function deleteUserById(id){
    users = users.filter(user => user.id !== id)
}