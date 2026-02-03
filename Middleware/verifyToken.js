
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToekn = (req, res, next) => {
    let token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "No token provided. Please login first." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token. Please login again." });
    }
}