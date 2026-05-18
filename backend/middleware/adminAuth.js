import jwt from "jsonwebtoken";

// Protects admin routes — verifies JWT and checks it contains an email (admin token)
const adminAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not authenticated. Please login." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // admin tokens carry email, user tokens carry userId
        if (!decoded.email) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.adminEmail = decoded.email;
        next();
    } catch (error) {
        console.log("adminAuth error", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default adminAuth;
