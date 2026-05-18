import express from "express";
import { addProduct, listProduct, removeProduct } from "../controller/productController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// add product — admin only, accepts 4 image files
router.post(
    "/addproduct",
    adminAuth,
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 },
    ]),
    addProduct
);

// list all products — public
router.get("/list", listProduct);

// remove a product — admin only
router.delete("/remove/:id", adminAuth, removeProduct);

export default router;
