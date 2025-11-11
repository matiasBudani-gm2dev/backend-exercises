import jwt from "jsonwebtoken";
import "dotenv/config";
import logger from "../winstonLogs.js";
import { checkForRoles } from "../utils/checkForRoles.js";

export async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).send("Invalid token");

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      logger.error(err);
      return res.sendStatus(401);
    }
    req.user = payload;
    next();
  });
}

export function authorizeRoles(addmitedRoles) {
  return (req, res, next) => {
    const roleNames = req.user.roles.map((role) => role.roleName);

    if (checkForRoles(addmitedRoles, roleNames)) {
      return next();
    }
    return res.status(403).send("Forbidden");
  };
}
