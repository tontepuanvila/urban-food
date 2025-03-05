import express from 'express'
import cors from "cors"
import { ConnectDB } from './config/db.js'            
import menuRouter from './routes/menuRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'


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

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

