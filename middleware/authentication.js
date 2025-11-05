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

export function authorizeRoles(role){
    return (req, res, next)=>{
        req.user.roles.map(r =>{
            if(r.roleName === role){
                next()
            }
        })
        res.status(403)
        return
    }
}
