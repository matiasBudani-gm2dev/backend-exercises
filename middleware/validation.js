export function schemaReqValidation(schema){
    return (req, res, next)=>{
        console.log("\n\n\nRequest body to validate:")
        console.log(req.body)
        console.log("\n\n\n")
        const {error, value} = schema.validate(req.body, {abortEarly: false, stripUnknown: true})
        if(error){
            let errorMessages = ''
            error.details.map(detailErr=>{
                console.error(detailErr)
                errorMessages += `${detailErr.message}\n`
            })
            res.status(400).send(errorMessages)
            return
        }
        else{
            console.log("Values:", value)
            next()
        }
    }
}