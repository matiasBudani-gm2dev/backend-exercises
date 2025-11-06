import logger from "../winstonLogs.js"

export function schemaReqValidation(schema){
    return (req, res, next)=>{
        const {error, value} = schema.validate(req.body, {abortEarly: false, stripUnknown: true})
        if(error){
            let errorMessages = ''
            error.details.map(detailErr=>{
                logger.info(detailErr)
                errorMessages += `${detailErr.message}\n`
            })
            res.status(400).send(errorMessages)
            console.log(errorMessages)
            return
        }
        else{
            next()
        }
    }
}

export function schemaResValidation(schema, response){
    const {error} = schema.validate(response, {abortEarly: false, stripUnknown: true})
    if(error){
        let errorMessages = ''
        error.details.forEach(detailErr => {
            logger.info(detailErr)
            errorMessages += `${detailErr.message}\n`
        })
        return errorMessages
    }else{
        return false
    }
}