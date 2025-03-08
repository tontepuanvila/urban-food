import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MenuItem.css';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * MenuItem Component
 * 
 * This component is responsible for updating menu items. It allows users to edit details
 * such as name, description, price, category, availability, and image of a menu item.
 * 
 * Props:
 * @param {string} url - The base URL for API requests.
 * @param {function} fetchMenuItems - Function to refresh the menu items list after an update.
 */
const MenuItem = ({ url, fetchMenuItems }) => {
    const location = useLocation();
    const itemData = location.state?.itemData; // Access the passed menu item data
    const navigate = useNavigate();

    // State variables
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [imageName, setImageName] = useState('');
    
    // State for form data
    const [data, setData] = useState({
        name: itemData?.name || '',
        description: itemData?.description || '',
        price: itemData?.price || '',
        category: itemData?.category || 'Salad',
        availability: itemData?.availability || 'In Stock',
    });

    // Set preview image when itemData is available
    useEffect(() => {
        if (itemData?.image) {
            setPreview(`${url}/images/${itemData?.image}`);
            setImageName(itemData?.image);
        }
    }, [itemData, url]);

    // Navigate to menu update page on cancel
    const onCancelHandler = () => {
        navigate('/dashboard/updateMenu');
    };

    // Handle form field changes
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle image file selection
    const onImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setImageName(file.name);
            setData((prevData) => ({ ...prevData, image: file }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Form validation before submission
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

    // Handle form submission
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        formData.append('availability', data.availability === 'In Stock');
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.put(`${url}/api/menu/updateMenu/${itemData._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                fetchMenuItems(); // Refresh menu items
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="menu-item">
            <h2>Edit Menu Item</h2>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="menu-item-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" required />
                </div>

                <div className="menu-item-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" placeholder="Write content here" required></textarea>
                </div>

                <div className="menu-item-category flex-col">
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

                <div className="menu-item-price flex-col">
                    <p>Product Price</p>
                    <input className="inputclasa" onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="₹20" required />
                </div>

                <div className="menu-item-availability flex-col">
                    <p>Availability</p>
                    <select className="selectt" onChange={onChangeHandler} name="availability" value={data.availability}>
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </div>

                <div className="menu-item-img-upload flex-col">
                    <label htmlFor="image">Upload Image</label>
                    <input type="file" id="image" onChange={onImageChange} required />
                    {preview && <img src={preview} alt="Preview" className="image-preview" />}
                    {imageName && <p>Selected image: {imageName}</p>}
                </div>

                <div className="menu-item-buttons">
                    <button type="submit" className="menu-item-btn">UPDATE</button>
                    <button type="button" className="cancel-btn" onClick={onCancelHandler}>CANCEL</button>
                </div>
            </form>
        </div>
    );
};

export default MenuItem;
