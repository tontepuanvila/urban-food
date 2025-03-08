import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddMenu.css';
import { assets } from '../../../assets/assets';

/**
 * AddMenu Component
 * This component allows users to add a new menu item by providing details such as:
 * - Name
 * - Description
 * - Price
 * - Category
 * - Availability
 * - Image
 * 
 * @param {string} url - The base URL for API requests
 * @param {function} fetchMenuItems - Function to refresh the menu items list after adding a new item
 */
const AddMenu = ({ url, fetchMenuItems }) => {
    // State to manage form data
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad',
        availability: 'In Stock'
    });


    /**
     * Handles changes to text inputs and select elements.
     * Updates the corresponding field in the state.
     */
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    /**
     * Handles image file selection and updates the preview.
     * Stores the image file in the state.
     */
    const onImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setData((prevData) => ({ ...prevData, image: file }));

            // Generate image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    /**
     * Validates the form data before submission.
     * Ensures all required fields are filled out correctly.
     * Displays error messages using `toast` notifications if validation fails.
     * 
     * @returns {boolean} - Returns true if form is valid, otherwise false.
     */
    const validateForm = () => {
        const { name, price, description, category, availability } = data;

        if (!name.trim()) {
            toast.error('Name is required');
            return false;
        }

        if (!price || isNaN(price) || price <= 0) {
            toast.error('Price must be a positive number');
            return false;
        }

        if (!description.trim()) {
            toast.error('Description is required');
            return false;
        }

        if (!category.trim()) {
            toast.error('Category is required');
            return false;
        }

        if (!availability) {
            toast.error('Availability is required');
            return false;
        }

        if (!image) {
            toast.error('Please select an image');
            return false;
        }

        return true;
    };

    /**
     * Handles form submission.
     * Validates the form and sends the data to the backend.
     * If successful, resets the form and updates the menu items list.
     */
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Creating FormData object for file upload
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        formData.append('availability', data.availability === 'In Stock');
        formData.append('image', image);

        try {
            // Sending the POST request to add a new menu item
            const response = await axios.post(`${url}/api/menu/addMenu`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                // Reset form fields after successful submission
                setData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Salad',
                    availability: 'In Stock'
                });
                setImage(null);
                setPreview('');
                toast.success(response.data.message);

                // Refresh menu items list
                fetchMenuItems();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="add">
            <h2>Add Menu</h2>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                {/* Product Name Input */}
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                        required
                    />
                </div>

                {/* Product Description Input */}
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        placeholder="Write content here"
                        required
                    ></textarea>
                </div>

                {/* Category & Price Inputs */}
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select className="selectt" onChange={onChangeHandler} name="category" value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input
                            className="inputclasa"
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="₹20"
                            required
                        />
                    </div>
                </div>

                {/* Availability Selection */}
                <div className="add-availability flex-col">
                    <p>Availability</p>
                    <select className="selectt" onChange={onChangeHandler} name="availability" value={data.availability}>
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </div>

                {/* Image Upload Section */}
                <div className="add-img-upload flex-col">
                    <label htmlFor="image">
                        Upload Image
                    </label>
                    <input type="file" id="image" onChange={onImageChange} required />
                    {preview && <img src={preview} alt="Preview" className="image-preview" />}
                </div>

                {/* Submit Button */}
                <button type="submit" className="add-btn">ADD</button>
            </form>
        </div>
    );
};

export default AddMenu;
