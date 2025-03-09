import menuModel from "../models/menuModel.js";
import fs from 'fs';
import mongoose from "mongoose";
import upload from "../config/cloudinary.js";



/**
 * Add a new menu item.
 * @param {Object} req - The request object containing menu details and uploaded image.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} - Success or failure message.
 */
const addMenu = async (req, res) => {
    let image_filename = req.file.path;

    const menu = new menuModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
        availability: req.body.availability
    });
    try {
        await menu.save();
        res.json({ success: true, message: "Menu Item added successfully." });
    } catch (error) {
        res.json({ success: false, message: error.message });
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

        // Check if the new image is uploaded, or if existing image is provided
        if (req.file) {
            const result = await cloudinary.uploader.upload_stream({ resource_type: "image" }, async (error, result) => {
                if (error) {
                    return res.status(500).json({ success: false, message: "Cloudinary upload failed" });
                }
                updateFields.image = result.secure_url; // Store Cloudinary URL
                // Update the menu after uploading new image
                const updatedMenu = await menuModel.findByIdAndUpdate(id, updateFields, { new: true });
                res.json({ success: true, message: "Menu Item updated successfully", menu: updatedMenu });
            });

            result.end(req.file.buffer); // Send file buffer to Cloudinary
        } else if (req.body.existingImage) {
            // If no new image is uploaded, use the existing image name
            updateFields.image = req.body.existingImage;
            // Update menu without changing the image
            const updatedMenu = await menuModel.findByIdAndUpdate(id, updateFields, { new: true });
            res.json({ success: true, message: "Menu Item updated successfully", menu: updatedMenu });
        } else {
            // Handle case where no image (new or existing) is provided
            const updatedMenu = await menuModel.findByIdAndUpdate(id, updateFields, { new: true });
            res.json({ success: true, message: "Menu Item updated successfully", menu: updatedMenu });
        }
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
