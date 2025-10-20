export function createError(statusCode, type, message){
    if(statusCode && type && message){
        return {
            statusCode : statusCode,
            type : type,
            message : message
        }
    }
    return {
        statusCode: 500,
        type: "INTERNAL_SERVER_ERROR",
        message: "Unexpected error"
    }
}