import jwt from "jsonwebtoken";

// Protects user routes — reads JWT from cookie and attaches userId to req
const isAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not authenticated. Please login." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.log("isAuth error", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default isAuth;
