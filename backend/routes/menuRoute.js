/**
 * @file menuRoute.js
 * @description Defines the API routes for menu-related operations in the Urban Food application.
 * This file sets up the Express router for handling menu item addition, listing, updating, and removal.
 */
import express from "express"
import { addMenu, removeMenu, listMenu, updateMenu } from "../controllers/menuController.js"
import upload from "../middleware/upload.js";
/**
 * Express router to mount menu related functions on.
 * @type {object}
 * @const
 */
const menuRouter = express.Router();


/**
 * Route serving menu item addition.
 * @name post/addMenu
 * @function
 * @memberof module:routes/menuRoute
 * @inner
 */
menuRouter.post("/addMenu", upload.single("image"), addMenu);

/**
 * Route serving menu items listing.
 * @name get/listMenu
 * @function
 * @memberof module:routes/menuRoute
 * @inner
 */
menuRouter.get("/listMenu", listMenu);

/**
 * Route serving menu item update.
 * @name put/updateMenu/:id
 * @function
 * @memberof module:routes/menuRoute
 * @inner
 */
menuRouter.put("/updateMenu/:id",upload.single("image"), updateMenu);

/**
 * Route serving menu item removal.
 * @name delete/removeMenu/:id
 * @function
 * @memberof module:routes/menuRoute
 * @inner
 */
menuRouter.delete("/removeMenu/:id", removeMenu);
export default menuRouter;
