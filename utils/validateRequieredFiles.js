export function validateRequiredFiles(req, requiredFiles){    

    if(!req.body){
        return false
    }

    for(const file of requiredFiles){
        console.log(file)
        console.log(req.body[file])
        if(!req.body[file]){
            return false
        }
    }
    return true
}