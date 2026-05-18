import multer from "multer";
import path from "path";

// store uploaded files temporarily in /public before sending to Cloudinary
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public");
    },
    filename: (req, file, cb) => {
        // keep original filename
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

export default upload;
