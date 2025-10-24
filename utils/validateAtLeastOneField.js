export function validateAtLeastOneField(req, fields){
    if(!req.body){
        return false
    }
    for(const field of fields){
        if(req.body[field] !== undefined){
            return true
        }
    }
    return false
}