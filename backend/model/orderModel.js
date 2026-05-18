import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        items: {
            type: Array,  // array of product objects with size + quantity added
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        address: {
            type: Object, // delivery address form data
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "Order Placed", // Order Placed → Packing → Shipped → Out for delivery → Delivered
        },
        paymentMethod: {
            type: String,
            required: true, // "COD" or "Razorpay"
        },
        payment: {
            type: Boolean,
            required: true,
            default: false, // true once payment is confirmed
        },
        date: {
            type: Number, // Date.now() timestamp
            required: true,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
