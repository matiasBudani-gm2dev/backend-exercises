export function validateRequiredFiles(req, requiredFiles){    

    if(!req.body){
        return false
    }

    for(const file of requiredFiles){
        if(!req.body[file]){
            return false
        }
    }
    return true
}