import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const port = process.env.PORT || 6000;
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true, // needed so cookies are sent cross-origin
    })
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectDb();
});
