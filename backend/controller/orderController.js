import crypto from "crypto";
import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ─── USER ROUTES ────────────────────────────────────────────────────────────

// place a Cash on Delivery order
export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        const newOrder = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        });

        // clear the user's cart after order is placed
        await User.findByIdAndUpdate(userId, { cartData: {} });

        return res.status(201).json({ message: "Order placed" });
    } catch (error) {
        console.log("placeOrder error", error);
        return res.status(500).json({ message: "Failed to place order" });
    }
};

// create a Razorpay order ONLY on Razorpay API (do NOT save to DB before payment verification)
export const placeOrderRazorpay = async (req, res) => {
    try {
        const { amount } = req.body;

        // create Razorpay order — amount must be an integer in paise (multiply by 100 and round)
        const options = {
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log("razorpay order create error", error);
                return res.status(400).json({
                    message: error?.error?.description || "Razorpay order creation failed",
                    error
                });
            }
            return res.status(200).json(order);
        });
    } catch (error) {
        console.log("placeOrderRazorpay error", error);
        return res.status(500).json({ message: "Razorpay order failed" });
    }
};

// verify Razorpay payment — HMAC SHA256 signature verification + Razorpay API check, create DB order ONLY when paid
export const verifyRazorpay = async (req, res) => {
    try {
        const userId = req.userId;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: "Missing Razorpay payment parameters" });
        }

        // 1. Verify HMAC SHA256 signature
        const signBody = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(signBody.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            console.log("Razorpay signature verification failed");
            return res.status(400).json({ message: "Invalid payment signature" });
        }

        // 2. Fetch order info from Razorpay API to double check status
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === "paid") {
            const { items, amount, address } = orderData || {};

            // 3. Create the Order in MongoDB only AFTER verified payment
            const newOrder = await Order.create({
                userId,
                items,
                amount,
                address,
                paymentMethod: "Razorpay",
                payment: true,
                date: Date.now(),
            });

            // 4. Clear user cart
            await User.findByIdAndUpdate(userId, { cartData: {} });

            return res.status(200).json({ message: "Payment successful", orderId: newOrder._id });
        } else {
            return res.status(400).json({ message: "Payment not completed" });
        }
    } catch (error) {
        console.log("verifyRazorpay error", error);
        return res.status(500).json({ message: "Payment verification failed" });
    }
};

// get all orders for the logged-in user (COD or paid online orders)
export const userOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            userId: req.userId,
            $or: [{ paymentMethod: "COD" }, { payment: true }]
        });
        return res.status(200).json(orders);
    } catch (error) {
        console.log("userOrders error", error);
        return res.status(500).json({ message: "Failed to fetch orders" });
    }
};

// ─── ADMIN ROUTES ────────────────────────────────────────────────────────────

// get all orders across all users (COD or paid online orders)
export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentMethod: "COD" }, { payment: true }]
        });
        return res.status(200).json(orders);
    } catch (error) {
        console.log("allOrders error", error);
        return res.status(500).json({ message: "Failed to fetch orders" });
    }
};

// update order status (e.g. Packing → Shipped)
export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, { status });
        return res.status(200).json({ message: "Status updated" });
    } catch (error) {
        console.log("updateStatus error", error);
        return res.status(500).json({ message: "Failed to update status" });
    }
};
