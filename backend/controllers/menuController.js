import menuModel from "../models/menuModel.js";
import fs from 'fs';
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";


/**
 * Add a new menu item.
 * @param {Object} req - The request object containing menu details and uploaded image.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} - Success or failure message.
 */

const addMenu = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required." });
    }

    try {
        // Create a stream upload to Cloudinary from memory buffer
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "urban-food", // Folder in Cloudinary
                resource_type: "image", // Specify image upload type
                public_id: `${Date.now()}-${req.file.originalname}`, // Set a unique public ID
                format: "png", // Optionally, specify the format
            },
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ success: false, message: "Cloudinary upload failed" });
                }

                // Create a new menu item with the Cloudinary image URL
                const menu = new menuModel({
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    category: req.body.category,
                    image: result.secure_url, // Store the Cloudinary URL
                    availability: req.body.availability
                });

                // Save the menu item to the database
                try {
                    await menu.save();
                    res.json({ success: true, message: "Menu Item added successfully." });
                } catch (error) {
                    res.status(500).json({ success: false, message: error.message });
                }
            }
        );

        // Pipe the buffer from the memory storage to Cloudinary upload stream
        uploadStream.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



/**
 * List all menu items.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} - A list of menu items.
 */
const listMenu = async (req, res) => {
    try {
        const menu = await menuModel.find({});
        res.json({ success: true, data: menu });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

/**
 * Update an existing menu item.
 * @param {Object} req - The request object containing menu ID, updated fields, and optionally a new image.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} - Success or failure message.
 */
const updateMenu = async (req, res) => {
    const { id } = req.params;
    try {
        const existingMenu = await menuModel.findById(id);
        if (!existingMenu) {
            return res.status(404).json({ success: false, message: "Menu not found" });
        }

        const updateFields = { ...req.body };

        // Check if a new image is uploaded
        if (req.file) {
            try {
                const uploadResult = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: "image" },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                    stream.end(req.file.buffer); // Ensure buffer is sent
                });

                updateFields.image = uploadResult.secure_url; // Store Cloudinary URL
            } catch (uploadError) {
                return res.status(500).json({ success: false, message: "Cloudinary upload failed" });
            }
        } else if (req.body.existingImage) {
            updateFields.image = req.body.existingImage;
        }

        // Update the menu with new or existing image
        const updatedMenu = await menuModel.findByIdAndUpdate(id, updateFields, { new: true });
        res.json({ success: true, message: "Menu Item updated successfully", menu: updatedMenu });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



/**
 * Remove a menu item.
 * @param {Object} req - The request object containing the menu item ID.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} - Success or failure message.
 */
const removeMenu = async (req, res) => {
    try {
        const menu = await menuModel.findById(new mongoose.Types.ObjectId(req.params.id));
        fs.unlink(`uploads/${menu.image}`, () => { });

        await menuModel.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id));
        res.json({ success: true, message: "Menu Item removed successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { addMenu, listMenu, removeMenu, updateMenu };
