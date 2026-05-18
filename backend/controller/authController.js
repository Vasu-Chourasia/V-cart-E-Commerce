import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { genToken, genToken1 } from "../config/token.js";

const isProduction = process.env.NODE_ENV === "production";

// cookie options — secure:true in production (requires HTTPS)
const cookieOptions = (maxAge) => ({
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Strict", // None required for cross-site cookies in production
    maxAge,
});

// Register a new user with email and password
export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashPassword });

        const token = genToken(user._id);
        res.cookie("token", token, cookieOptions(7 * 24 * 60 * 60 * 1000));

        return res.status(201).json(user);
    } catch (error) {
        console.log("registration error", error);
        return res.status(500).json({ message: "Registration failed" });
    }
};

// Login with email and password
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = genToken(user._id);
        res.cookie("token", token, cookieOptions(7 * 24 * 60 * 60 * 1000));

        return res.status(200).json(user);
    } catch (error) {
        console.log("login error", error);
        return res.status(500).json({ message: "Login failed" });
    }
};

// Clear the auth cookie to log out
export const logOut = async (req, res) => {
    try {
        res.clearCookie("token", cookieOptions(0));
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("logout error", error);
        return res.status(500).json({ message: "Logout failed" });
    }
};

// Google OAuth — find or create user by email (no password needed)
export const googleLogin = async (req, res) => {
    try {
        const { name, email } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ name, email });
        }

        const token = genToken(user._id);
        res.cookie("token", token, cookieOptions(7 * 24 * 60 * 60 * 1000));

        return res.status(200).json(user);
    } catch (error) {
        console.log("googleLogin error", error);
        return res.status(500).json({ message: "Google login failed" });
    }
};

// Admin login — checks against env vars, not the database
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = genToken1(email);
            res.cookie("token", token, cookieOptions(1 * 24 * 60 * 60 * 1000));
            return res.status(200).json({ message: "Admin login successful" });
        }

        return res.status(400).json({ message: "Invalid credentials" });
    } catch (error) {
        console.log("adminLogin error", error);
        return res.status(500).json({ message: "Admin login failed" });
    }
};
