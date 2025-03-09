/**
 * @file userModel.js
 * @description Defines the Mongoose schema and model for User in the Urban Food application.
 */
import mongoose from 'mongoose';

/**
 * User Schema
 * @typedef {Object} UserSchema
 * @property {string} name - The user's name (required, trimmed)
 * @property {string} email - The user's email address (required, trimmed, unique)
 * @property {string} password - The user's password (required)
 * @property {string} role - The user's role (enum: 'admin', 'manager', 'user', default: 'user')
 * @property {Object} cartData - The user's cart data (default: empty object)
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'user'],
        default: 'user'
    },
    cartData: {type: Object, default: {}}
}, {minimize: false});

/**
 * User Model
 * @typedef {import('mongoose').Model<UserSchema>} UserModel
 */
const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;

