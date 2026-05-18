import express from "express";
import {
    placeOrder,
    placeOrderRazorpay,
    verifyRazorpay,
    userOrders,
    allOrders,
    updateStatus,
} from "../controller/orderController.js";
import isAuth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// user routes
router.post("/placeorder", isAuth, placeOrder);
router.post("/razorpay", isAuth, placeOrderRazorpay);
router.post("/verifyrazorpay", isAuth, verifyRazorpay);
router.post("/userorder", isAuth, userOrders);

// admin routes
router.post("/list", adminAuth, allOrders);
router.post("/status", adminAuth, updateStatus);

export default router;
