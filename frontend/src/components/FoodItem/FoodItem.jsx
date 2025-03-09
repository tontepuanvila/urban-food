import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/storeContext';

const FoodItem = ({ id, name, price, description, image, availability }) => {
  // Accessing cart-related functions and data from context
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        {/* Displaying food image */}
        <img className="food-item-image" src={url + '/images/' + image} alt={name} />

        {/* Overlay for out of stock items */}
        {availability !== "available" && (
          <div className="out-of-stock-overlay">
            <span>Sold Out</span>
          </div>
        )}

        {/* Add to cart button or cart item counter based on item availability and cart status */}
        {availability === "available" && (!cartItems?.[id] ? (
          <button className="add-btn initial" onClick={() => addToCart(id)}>
            Add to Cart
          </button>
        ) : (
          <div className="food-item-counter">
            {/* Remove from cart button and counter for quantity */}
            <button className="remove-btn" onClick={() => removeFromCart(id)}>
              -
            </button>
            <p className="cartitemsp">{cartItems[id]}</p>
            <button className="add-btn" onClick={() => addToCart(id)}>
              +
            </button>
          </div>
        ))}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          {/* Displaying food name and rating */}
          <p className="namewe">{name}</p>
          <img className="ratingstars" src={assets.rating_starts} alt="Rating" />
        </div>
        {/* Displaying description and price of the food item */}
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">Rs.{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
