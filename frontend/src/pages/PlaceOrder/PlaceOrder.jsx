import React, { useState, useContext, useEffect } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const PlaceOrder = () => {
  const { getTotalCartAmount, menuItems, cartItems, token } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const validateForm = () => {
    console.log("entered")

    if (!data.firstName) {
      toast.error('First Name is required');
      return false;
    }
    if (!data.lastName) {
      toast.error('Last Name is required');
      return false;
    }
    console.log(data.email)
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      console.log("test")
      toast.error('Please enter a valid email address');
      return false
    }
    if (!data.street) {
      toast.error('Street is required');
      return false
    }
    if (!data.city) {
      toast.error('City is required');
      return false;
    }
    if (!data.state) {
      toast.error('State is required');
      return false;
    }
    if (!data.zipcode) {
      toast.error('Zip code is required');
      return false;
    }
    if (!data.country) {
      toast.error('Country is required');
      return false;
    }
    console.log(data.phone)
    if (!data.phone || !/^\d{10}$/.test(data.phone)) {
      console.log("test")
      toast.error('Please enter a valid phone number');
      return false;
    }
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    let orderItems = [];

    menuItems.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          menuItemId: item._id,
          quantity: cartItems[item._id],
          price: item.price,
        });
      }
    });

    const amount = getTotalCartAmount();

    const orderData = {
      items: orderItems,
      amount,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/order/placeOrder', orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { redirect_url } = response.data;
        window.location.replace(redirect_url);
      } else {
        toast.error('Error placing order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order');
    }
  };

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name='firstName'
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder='First Name'
          />
          <input
            required
            name='lastName'
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder='Last Name'
          />
        </div>
        <input
          className='email'
          required
          name='email'
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder='Email address'
        />
        <input
          className='street'
          required
          name='street'
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder='Street'
        />
        <div className="multi-fields">
          <input
            required
            name='city'
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder='City'
          />
          <input
            required
            name='state'
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder='State'
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name='zipcode'
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder='Zip code'
          />
          <input
            required
            name='country'
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder='Country'
          />
        </div>
        <input
          className='phone'
          required
          name='phone'
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder='Phone'
        />
      </div>
      <div className="place-order-right">
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
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
