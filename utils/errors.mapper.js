import { createError } from "/Users/gm2academy/Documents/GitHub/backend-exercises/utils/createError.js"

export function mapError(err){
    if(err.statusCode && err.type && err.message){
        return err
    }
    return createError(500, "Internal Server Error", "Ha ocurrido un error inesperado")
}