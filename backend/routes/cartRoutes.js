import express from "express";
import { addToCart, updateCart, getUserCart } from "../controller/cartController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

// all cart routes require the user to be logged in
router.post("/add", isAuth, addToCart);
router.post("/update", isAuth, updateCart);
router.post("/get", isAuth, getUserCart);

export default router;
