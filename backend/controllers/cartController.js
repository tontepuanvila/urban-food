import userModel from "../models/userModel.js";

/**
 * Add an item to the user's cart.
 * @param {Object} req - The request object containing user ID and item ID to add.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} - Success or failure message.
 */
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};

/**
 * Remove an item from the user's cart.
 * @param {Object} req - The request object containing user ID and item ID to remove.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} - Success or failure message.
 */
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};

/**
 * Fetch the current user's cart data.
 * @param {Object} req - The request object containing user ID.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} - Cart data or an error message if the user is not found.
 */
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId).lean();
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        let cartData = userData.cartData;
        res.json({ success: true, data: cartData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, removeFromCart, getCart };
