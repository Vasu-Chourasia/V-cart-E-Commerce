import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        // 4 product images stored as Cloudinary URLs
        image1: { type: String, required: true },
        image2: { type: String, required: true },
        image3: { type: String, required: true },
        image4: { type: String, required: true },
        category: {
            type: String,
            required: true, // Men | Women | Kids
        },
        subCategory: {
            type: String,
            required: true, // TopWear | BottomWear | WinterWear
        },
        sizes: {
            type: Array,
            required: true, // e.g. ["S", "M", "L", "XL"]
        },
        bestseller: {
            type: Boolean,
            default: false,
        },
        date: {
            type: Number, // Date.now() timestamp
            required: true,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
