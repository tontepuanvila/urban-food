import menuModel from "../models/menuModel.js";
import fs from 'fs'
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

// Set up multer for image storage (you can change the storage destination and filename format)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the folder to save files
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Generate unique filename with extension
    }
});

const upload = multer({ storage: storage });

//add menu item

const addMenu = async (req,res) => {

    let image_filename = `${req.file.filename}`;

    const menu = new menuModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
        availability:req.body.availability
    })
    try {
        await menu.save();
        res.json({success:true,message:"Menu Item added successfully."})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const listMenu= async (req,res) => {
    try {
        const menu = await menuModel.find({});
        res.json({success:true,data:menu})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}



// Update menu function
const updateMenu = async (req, res) => {
    const { id } = req.params;

    // Handle file upload (this will parse the uploaded file in 'image' field)
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'File upload failed' });
        }

        // Now that file is uploaded, we can access it in req.file, and other fields in req.body
        const updateFields = { ...req.body }; // Data from the form fields (name, description, etc.)

        // If the file was uploaded, include it in the updateFields
        if (req.file) {
            updateFields.image = req.file.filename; // Store only the filename in the database (not the file itself)
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


// remove food item
const removeMenu = async (req,res) => {
    try {
        const menu = await menuModel.findById(new mongoose.Types.ObjectId(req.params));
        fs.unlink(`uploads/${menu.image}`,()=>{})

        await menuModel.findByIdAndDelete(new mongoose.Types.ObjectId(req.params));
        res.json({success:true,message:"Menu Item removed successfully"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}



export {addMenu,listMenu,removeMenu,updateMenu}