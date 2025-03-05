import menuModel from "../models/menuModel.js";
import fs from 'fs'

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
        res.json({success:true,message:"Menu Item Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const listMenu= async (req,res) => {
    try {
        const menu = await menuModel.find({});
        res.json({success:true,data:menu})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const updateMenu= async (req,res)=>{
    const {id}=req.params
    const updateFields=req.body
    console.log(updateFields)
     try {
         const updatedMenu=await menuModel.findByIdAndUpdate(id,updateFields,{new:true});
         console.log(updatedMenu)
         if (updatedMenu) {
            res.json({success:true,message: 'Menu updated successfully'});
        } else {
            res.json({success:false, message: 'Menu not found' });
        }
     } catch (error) {
        res.json({success:false, message: error.message });
     }
}

// remove food item
const removeMenu = async (req,res) => {
    try {
        const menu = await menuModel.findById(req.params);
        console.log(menu)
        fs.unlink(`uploads/${menu.image}`,()=>{})

        await menuModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Menu Item Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}



export {addMenu,listMenu,removeMenu,updateMenu}