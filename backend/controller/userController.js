import User from "../model/userModel.js";

// returns the currently logged-in user (without password)
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log("getCurrentUser error", error);
        return res.status(500).json({ message: "Failed to get user" });
    }
};

// returns admin info — just confirms the admin cookie is valid
export const getAdmin = async (req, res) => {
    try {
        return res.status(200).json({ email: req.adminEmail, role: "admin" });
    } catch (error) {
        console.log("getAdmin error", error);
        return res.status(500).json({ message: "Failed to get admin" });
    }
};
