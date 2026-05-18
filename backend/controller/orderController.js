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

// create a Razorpay order and save it with payment:false
export const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        const newOrder = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now(),
        });

        // create Razorpay order — amount must be in paise (multiply by 100)
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: newOrder._id.toString(),
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json(error);
            }
            return res.status(200).json(order);
        });
    } catch (error) {
        console.log("placeOrderRazorpay error", error);
        return res.status(500).json({ message: "Razorpay order failed" });
    }
};

// verify Razorpay payment — mark order as paid and clear cart
export const verifyRazorpay = async (req, res) => {
    try {
        const userId = req.userId;
        const { razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === "paid") {
            await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            await User.findByIdAndUpdate(userId, { cartData: {} });
            return res.status(200).json({ message: "Payment successful" });
        } else {
            return res.status(400).json({ message: "Payment not completed" });
        }
    } catch (error) {
        console.log("verifyRazorpay error", error);
        return res.status(500).json({ message: "Payment verification failed" });
    }
};

// get all orders for the logged-in user
export const userOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId });
        return res.status(200).json(orders);
    } catch (error) {
        console.log("userOrders error", error);
        return res.status(500).json({ message: "Failed to fetch orders" });
    }
};

// ─── ADMIN ROUTES ────────────────────────────────────────────────────────────

// get all orders across all users
export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
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
