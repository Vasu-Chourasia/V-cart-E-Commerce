import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "./model/orderModel.js";

dotenv.config();

const cleanup = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB.");

        // Find unpaid non-COD orders
        const unpaidOrders = await Order.find({
            paymentMethod: { $ne: "COD" },
            payment: false
        });

        console.log(`Found ${unpaidOrders.length} unpaid non-COD order(s) to remove:`);
        unpaidOrders.forEach(o => {
            console.log(`- Order ID: ${o._id}, PaymentMethod: ${o.paymentMethod}, Amount: ${o.amount}, Date: ${new Date(o.date).toLocaleString()}`);
        });

        if (unpaidOrders.length > 0) {
            const result = await Order.deleteMany({
                paymentMethod: { $ne: "COD" },
                payment: false
            });
            console.log(`Successfully deleted ${result.deletedCount} unverified/failed order(s).`);
        } else {
            console.log("No unverified/failed orders found.");
        }

        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    } catch (error) {
        console.error("Cleanup failed:", error);
        process.exit(1);
    }
};

cleanup();
