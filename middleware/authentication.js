import jwt from "jsonwebtoken";
import "dotenv/config"
import logger from "../winstonLogs.js";

export async function authenticateToken(req, res, next){
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]

    if(!token) return res.status(401).send("Invalid token")
    
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if(err){ 
            logger.error(err)
            return res.sendStatus(401)
        }
        req.user = payload
        next()
    })
}

export function authorizeRoles(addmitedRoles){
    return (req, res, next)=>{

        if(!Array.isArray(addmitedRoles)) res.status(500).send("el programador es medio bobito pobre")

        req.user.roles.map(r =>{
            console.log(r)
            if(addmitedRoles.includes(r)){
                next()
            }
        })
        res.status(403).send("Forbidden")
        return
    }
}
