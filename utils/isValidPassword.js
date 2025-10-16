export function isValidPassword(password) {
    if (typeof password !== 'string') {
        return false;
    }
    if(password.length < 6) {
        return false
    }
    return true
}