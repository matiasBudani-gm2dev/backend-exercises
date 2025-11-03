export function schemaValidation(schema){
    return (req, res, next)=>{
        const {error, values} = schema.validate(req.body, {abortEarly: false, stripUnknown: true})
        if(error){
            let errorMessages = ''
            error.details.map(detailErr=>{
                console.error(detailErr.message)
                errorMessages += `${detailErr.message}\n`
            })
            res.status(400).send(errorMessages)
            
        }
        else{
            console.log("Values:", values)
            next()
        }
    }
}