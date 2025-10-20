import { createError } from "./CreateError.js"

export function mapError(err){
    if(err.statusCode && err.type && err.message){
        return err
    }
    return createError(500, "Internal Server Error", "Unexpected error")
}