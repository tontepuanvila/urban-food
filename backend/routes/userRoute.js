/**
 * @file userRoute.js
 * @description Defines the API routes for user-related operations in the Urban Food application.
 * This file sets up the Express router for handling user registration and login requests.
 * 
 * @requires express
 * @requires ../controllers/userController.js
 */
import express from "express"
import { loginUser, registerUser } from "../controllers/userController.js"

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 */
const userRouter = express.Router()

/**
 * Route serving user registration.
 * @name post/register
 * @function
 * @memberof module:routes/userRoute
 * @inner
 */
userRouter.post("/register", registerUser)

/**
 * Route serving user login.
 * @name post/login
 * @function
 * @memberof module:routes/userRoute
 * @inner
 */
userRouter.post("/login", loginUser)

export default userRouter;

