export function validateRequiredFiles(req, requiredFiles){    

    if(!req.body){
        return false
    }

    for(const file of requiredFiles){
        if(req.body[file] === undefined){
            return false
        }
    }
    return true
}