import jwt from "jsonwebtoken";

// generates token for users — payload contains userId, email, and role
export const genToken = (userId, email = "", role = "user") => {
    return jwt.sign({ userId, email, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// generates token for .env admin login — explicitly includes role: 'admin'
export const genToken1 = (email) => {
    return jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
