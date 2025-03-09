import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

/**
 * Generate a JWT token.
 * @param {string} id - The user ID to be encoded into the token.
 * @returns {string} - The generated JWT token.
 */
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

/**
 * Register a new user.
 * Validates user input (email, password) and creates a new user.
 * Hashes the password before saving and generates a JWT token.
 * 
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object for sending back results.
 * @returns {Object} - The result of the registration process (success or failure).
 */
const registerUser = async (req, res) => {
    const { name, password, email, role } = req.body;

    try {
        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists." });
        }

        // Validate email and password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email." });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password (minimum of 8 characters)." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        });
        const user = await newUser.save();

        // Create a token for the new user
        const token = createToken(user._id);
        const userRole = user.role;

        res.json({ success: true, token, role: userRole, message: "Signed Up Successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

/**
 * Login a user.
 * Checks if the user exists and validates the password using bcrypt.
 * If valid, generates a JWT token for the user.
 * 
 * @param {Object} req - The request object containing email and password.
 * @param {Object} res - The response object for sending back results.
 * @returns {Object} - The result of the login process (success or failure).
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: `User doesn't exist` });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Create a token for the user
        const token = createToken(user._id);
        const role = user.role;

        res.json({ success: true, token, role, message: "Logged In Successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { registerUser, loginUser };
