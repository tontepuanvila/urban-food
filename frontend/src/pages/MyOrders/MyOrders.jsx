import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  // Function to fetch user's order data from the backend
  const fetchUserOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      setData(response.data.data);  // Set the fetched data to state
    } catch (error) {
      toast.error("Unable to fetch the Orders."); // Show error toast if fetching fails
    }
  };

  // useEffect to fetch orders on initial load or when token changes
  useEffect(() => {
    if (token) {
      fetchUserOrders(); // Fetch orders if token is available
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2 className='myordersp'>My Orders</h2>
      <div className="container">
        {/* Loop through the fetched orders and display them */}
        {data.map((order, index) => (
          <div key={index} className='my-orders-order'>
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <p>{order.items.map((item, idx) => (
              <span key={idx}>{item.menuItemName} x {item.quantity}{idx !== order.items.length - 1 ? ', ' : ''}</span>
            ))}</p>
            <p>Rs. {order.totalAmount}</p>
            <p>Items: {order.items.length}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
