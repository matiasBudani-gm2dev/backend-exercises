let users = []

export function findAll(){
    return users
}

export function findUserById(id){
    return users.find(user => user.id === id)
}

export function findByEmail(email){
    if(users.find(user => user.email === email)){
        return "Usuario encontrado"
    }
    return undefined
}

export function existsByEmail(email){
    if(users.some(user => user.email === email)){
        return "Usuario encontrado"
    }

    return null
}

export function createSavedUser(user){
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

    for (const [key, value] of Object.entries(newUserData)) {
        if(value === undefined){
            delete newUserData[key]
        }
    }
    
    const user = findUserById(id)

    Object.assign(user, newUserData)

    return user

}

export function deleteUserById(id){
    const userDeleted = findUserById(id)
    users = users.filter(user => user.id !== id)
    if(!userDeleted) return null
    return userDeleted
}