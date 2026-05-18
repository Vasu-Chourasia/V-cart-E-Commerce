import express from "express";
import {
    registration,
    login,
    logOut,
    googleLogin,
    adminLogin,
} from "../controller/authController.js";

const router = express.Router();

router.post("/registration", registration);
router.post("/login", login);
router.get("/logout", logOut);
router.post("/googlelogin", googleLogin);
router.post("/adminlogin", adminLogin);

export default router;
