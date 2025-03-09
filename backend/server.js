
/**
 * @file server.js
 * @description Main entry point for the backend server of the Urban Food application.//+
 * This file sets up the Express application, connects to the MongoDB database,//+
 * configures middleware, and defines API routes.
 *
 * @requires express
 * @requires mongoose
 * @requires dotenv
 * @requires cors
 * @requires body-parser
 */
import express from 'express'
import cors from "cors"
import { ConnectDB } from './config/db.js'            
import menuRouter from './routes/menuRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'



//app configuration
const app=express()
const port=5000

//middleware
app.use(express.json())
app.use(cors())

//db Connection
ConnectDB();

//api endpoints
app.use("/api/menu",menuRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

/**
 * Defines the root route handler for the API.
 * This function responds to GET requests on the root path ("/") of the server.
 */
app.get("/", (req, res) => {
    res.send("API Working")
})


// Starts the Express server and listens for incoming connections on the specified port.
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})


