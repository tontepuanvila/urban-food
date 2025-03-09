/**
 * Mongoose schema for the Menu model.
 * Defines the structure and validation rules for menu items.
 */
import mongoose from "mongoose";
const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },        // Name of the menu item
    category: { type: String },                    // Category of the menu item (e.g., appetizer)
    image: { type: String, required: true },       // Image URL of the menu item
    description: { type: String, required: true }, // Description of the menu item
    price: { type: Number, required: true },       // Price of the menu item
    availability: { type: Boolean, default: true } // Availability status of the menu item
});

/**
 * The Menu model based on the menuSchema.
 * @type {mongoose.Model}
 */
const menuModel = mongoose.models.menu || mongoose.model("Menu", menuSchema);

export default menuModel;
