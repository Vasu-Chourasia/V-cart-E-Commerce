import jwt from "jsonwebtoken";

// generates token for regular users — payload contains userId
export const genToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// generates token for admin — payload contains email
export const genToken1 = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
