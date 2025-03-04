import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {
    const {name,password,email,role} = req.body;
    try {
        //checking if user already exists
        const exists = await userModel.findOne({email,role});
        if (exists){
            return res.json({success:false,message:"User already exists."})
        }

        // validating email format & strong password
        if (!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email."})
        }


        if (password.length<8){
            return res.json({success:false,message:"Please enter a strong password."})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
            role:role
        })
        const user = await newUser.save()
        console.log(user);
        const token = createToken(user._id)
        const userRole=user.role
        res.json({success:true,token,role:userRole});
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})
        console.log(user);
        if (!user){
            return res.json({success:false,message:`User doesn't exist`})
        }
        
        const isMatch = await bcrypt.compare(password,user.password);
        
        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }
        
        const token = createToken(user._id);
        const role=user.role
        
        res.json({success:true,token,role})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export { registerUser,loginUser };
