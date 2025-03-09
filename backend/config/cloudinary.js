import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Storage Setup
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "urban-food", // Folder in Cloudinary
        format: async (req, file) => "png", // Convert all to PNG
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

// Multer Middleware for Uploading to Cloudinary
const upload = multer({ storage });

export default upload;
