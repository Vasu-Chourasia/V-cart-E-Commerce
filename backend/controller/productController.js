import Product from "../model/productModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";

// Add a new product — uploads 4 images to Cloudinary
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // upload each image and get back the Cloudinary URL
        const image1 = await uploadOnCloudinary(req.files.image1[0].path);
        const image2 = await uploadOnCloudinary(req.files.image2[0].path);
        const image3 = await uploadOnCloudinary(req.files.image3[0].path);
        const image4 = await uploadOnCloudinary(req.files.image4[0].path);

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),         // sent as JSON string from form
            bestseller: bestseller === "true", // sent as string from form
            date: Date.now(),
            image1,
            image2,
            image3,
            image4,
        };

        const product = await Product.create(productData);
        return res.status(201).json(product);
    } catch (error) {
        console.log("addProduct error", error);
        return res.status(500).json({ message: "Failed to add product" });
    }
};

// Get all products — used by frontend to display catalog
export const listProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json(products);
    } catch (error) {
        console.log("listProduct error", error);
        return res.status(500).json({ message: "Failed to fetch products" });
    }
};

// Delete a product by ID — admin only
export const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        return res.status(200).json(product);
    } catch (error) {
        console.log("removeProduct error", error);
        return res.status(500).json({ message: "Failed to remove product" });
    }
};
