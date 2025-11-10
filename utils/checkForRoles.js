export function checkForRoles(addmitedRoles, userRoles){
    if (!Array.isArray(addmitedRoles) || !Array.isArray(userRoles)) {
        return false
    }
    return addmitedRoles.some(role => userRoles.includes(role))
}