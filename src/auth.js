import jwt from "jsonwebtoken";
const JWT_SECRET = "your_jwt_secret";

export function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    console.log("Auth Header:", authHeader);
    console.log("Token Extracted:", token);

    if (!token) {
        console.log("No token provided");
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log("JWT verification failed:", err.message);
            return res.sendStatus(403);
        }
        console.log("JWT Decoded User:", user);
        req.user = user;
        next();
    });
}

export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {

        console.log("Allowed Roles:", allowedRoles);
        console.log("User Roles:", req.user.roles);
        if (!req.user) return res.sendStatus(401);

        if (!allowedRoles.includes(req.user.roles)) {
            return res.status(403).json({ message: "Forbidden: insufficient role" });
        }

        next();
    };
}

