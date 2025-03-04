import React, { useState } from 'react';
import './ModifyMenu.css';

const ModifyMenu = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        availability: '',
        image: ''
    });
    const [preview, setPreview] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                image: file
            });

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    return (
        <div className="modify-items-component">
            <h2>Modify Item</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleInputChange} required />
                </label>
                <label>
                    Category:
                    <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
                </label>
                <label>
                    Availability:
                    <select name="availability" value={formData.availability} onChange={handleInputChange} required>
                        <option value="">Select</option>
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </label>
                <label>
                    Image:
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {preview && <img src={preview} alt="Preview" className="image-preview" />}
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ModifyMenu;
