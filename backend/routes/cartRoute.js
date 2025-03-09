/**
 * @file cartRoute.js
 * @description Defines the API routes for cart-related operations in the Urban Food application.
 * This file sets up the Express router for handling cart item addition, removal, and retrieval.
 */
import express from "express"
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js"

/**
 * Express router to mount cart related functions on.
 * @type {object}
 * @const
 */
const cartRouter = express.Router();

/**
 * Route serving cart item addition.
 * @name post/addToCart
 * @function
 * @memberof module:routes/cartRoute
 * @inner
 */
cartRouter.post("/addToCart", authMiddleware, addToCart)

/**
 * Route serving cart item removal.
 * @name post/removeFromCart
 * @function
 * @memberof module:routes/cartRoute
 * @inner
 */
cartRouter.post("/removeFromCart", authMiddleware, removeFromCart)

/**
 * Route serving cart items retrieval.
 * @name post/getCartItems
 * @function
 * @memberof module:routes/cartRoute
 * @inner
 */
cartRouter.post("/getCartItems", authMiddleware, getCart)
export default cartRouter;
