let users = []

export function getAllUsers(){
    return users
}

export function findUserById(id){
    return users.find(user => user.id === id)
}

export function addUser(user){
    users.push(user)
    return true
}

export function updateUserById(id, newUserData){
    const userIndex = users.findIndex(user => user.id === id)

    users[userIndex] = {...users[userIndex], ...newUserData}
}

export function deleteUserById(id){
    users = users.filter(user => user.id !== id)
}

export function emailExists(email){
    return users.some(user => user.email === email)
}