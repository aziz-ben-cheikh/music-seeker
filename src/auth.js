import { rolePermissions } from "./roles.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = "your_jwt_secret";

export function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];



    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

export function authorizePermission(requiredPermission) {
    return (req, res, next) => {
        const userRole = req.user.roles;
        const permissions = rolePermissions[userRole] || [];

        if (!permissions.includes(requiredPermission)) {
            return res.status(403).json({ message: "Forbidden: insufficient permission" });
        }

        next();
    };
}


