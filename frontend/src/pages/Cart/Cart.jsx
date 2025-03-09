import React from 'react';
import './Cart.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, menuItems, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  // Handles navigation to checkout or login
  const handleCheckout = () => {
    if (Object.keys(cartItems).length > 0) {
      if (token) {
        navigate('/placeOrder');
      } else {
        navigate('/login');
      }
    } else {
      toast.error("Your Cart is Empty");
    }
  };

  return (
    <div className='cart'>
      {/* Displaying cart items */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {menuItems.map((item, index) => {
          if (cartItems?.[item._id] > 0) {
            return (
              <div key={index}>
                <div className='cart-items-title cart-items-item'>
                  <img src={url + '/images/' + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>Rs.{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>Rs.{item.price * cartItems[item._id]}</p>
                  <strong><p onClick={() => removeFromCart(item._id)} className='cross'>x</p></strong>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      {/* Cart totals section */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs.{getTotalCartAmount() === 0 ? 0 : 10}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}</b>
            </div>
          </div>
          {/* Proceed to checkout */}
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
