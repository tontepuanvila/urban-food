import express from 'express'
import cors from "cors"


//app configuration
const app=express()
const port=5000

//middleware
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

