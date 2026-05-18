import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// uploads a local file to Cloudinary, then deletes the local copy
const uploadOnCloudinary = async (localFilePath) => {
    try {
        const result = await cloudinary.uploader.upload(localFilePath);
        fs.unlinkSync(localFilePath); // remove temp file after upload
        return result.secure_url;
    } catch (error) {
        fs.unlinkSync(localFilePath); // clean up even on failure
        console.log("Cloudinary upload error", error);
        return null;
    }
};

export default uploadOnCloudinary;
