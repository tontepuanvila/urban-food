import menuModel from "../models/menuModel.js";
import fs from 'fs';
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

// Set up multer for image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const upload = multer({ storage: storage });

/**
 * Add a new menu item.
 * @param {Object} req - The request object containing menu details and uploaded image.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} - Success or failure message.
 */
const addMenu = async (req, res) => {
    let image_filename = `${req.file.filename}`;

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

    // Handle file upload
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'File upload failed' });
        }

        const updateFields = { ...req.body };

        if (req.file) {
            updateFields.image = req.file.filename;
        }

        try {
            const updatedMenu = await menuModel.findByIdAndUpdate(id, updateFields, { new: true });

            if (updatedMenu) {
                res.json({ success: true, message: 'Menu Item updated successfully' });
            } else {
                res.json({ success: false, message: 'Menu not found' });
            }
        } catch (error) {
            res.json({ success: false, message: error.message });
        }
    });
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
        fs.unlink(`uploads/${menu.image}`, () => {});

        await menuModel.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id));
        res.json({ success: true, message: "Menu Item removed successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { addMenu, listMenu, removeMenu, updateMenu };
