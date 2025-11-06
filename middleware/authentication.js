import jwt from "jsonwebtoken";
import "dotenv/config"
import logger from "../winstonLogs.js";

export async function authenticateToken(req, res, next){
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]

    if(!token) return res.status(401).send("Invalid token")
    
    console.log("estoy verificando el token")
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        console.log("termine de verificar el token")
        if(err){ 
            logger.error(err)
            return res.sendStatus(401)
        }
        console.log("no hubo ningun error")
        req.user = payload
        next()
    })
}

export function authorizeRoles(role){
    return (req, res, next)=>{
        req.user.roles.map(r =>{
            console.log(r)
            if(r.roleName === role){
                next()
            }
        })
        console.log("no esta el rol")
        res.status(403).send("Forbidden")
        console.log("hubo un 403")
        return
    }
}
