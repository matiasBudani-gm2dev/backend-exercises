export function createError(statusCode, type, message){
    return {
        statusCode : statusCode,
        type : type,
        message : message
    };
}