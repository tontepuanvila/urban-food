/**
 * @file orderRoute.js
 * @description Defines the API routes for order-related operations in the Urban Food application.
 * This file sets up the Express router for handling order placement, retrieval, and status updates.
 */
import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js"

/**
 * Express router to mount order related functions on.
 * @type {object}
 * @const
 */
const orderRouter = express.Router();

/**
 * Route serving order placement.
 * @name post/placeOrder
 * @function
 * @memberof module:routes/orderRoute
 * @inner
 */
orderRouter.post("/placeOrder", authMiddleware, placeOrder);

/**
 * Route serving user's order retrieval.
 * @name post/userorders
 * @function
 * @memberof module:routes/orderRoute
 * @inner
 */
orderRouter.post("/userorders", authMiddleware, userOrders)

/**
 * Route serving all orders listing.
 * @name get/listOrders
 * @function
 * @memberof module:routes/orderRoute
 * @inner
 */
orderRouter.get("/listOrders", listOrders)

/**
 * Route serving order status update.
 * @name put/updateStatus/:id
 * @function
 * @memberof module:routes/orderRoute
 * @inner
 */
orderRouter.put("/updateStatus/:id", updateStatus)
export default orderRouter;
