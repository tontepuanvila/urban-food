import mongoose from 'mongoose'

export const ConnectDB=async ()=>{
    await mongoose.connect(process.env.MONGODB_URI).then(()=>{console.log("DB Connected")})
}
