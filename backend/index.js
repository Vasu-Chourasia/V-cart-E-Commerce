import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const port = process.env.PORT || 6000;
const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.FRONTEND_URL,  // e.g. https://v-cart.vercel.app
    process.env.ADMIN_URL,     // e.g. https://v-cart-admin.vercel.app
].filter(Boolean); // remove undefined if env vars not set

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectDb();
});
