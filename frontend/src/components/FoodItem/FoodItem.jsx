import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/storeContext';

const FoodItem = ({ id, name, price, description, image,availability }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={url + '/images/' + image} alt={name} />

        {/* Out of Stock Overlay */}
        {availability !== "available" && (
          <div className="out-of-stock-overlay">
            <span>Sold Out</span>
          </div>
        )}

        {/* Initial Add to Cart Button */}
       { availability==="available" && (!cartItems?.[id]  ? (
          <button className="add-btn initial" onClick={() => addToCart(id)}>
            Add to Cart
          </button>
        ) : (
          <div className="food-item-counter">
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
          <p className="namewe">{name}</p>
          <img className="ratingstars" src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">Rs.{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
