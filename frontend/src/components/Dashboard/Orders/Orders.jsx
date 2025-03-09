import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Orders.css';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/listOrders`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Unable to fetch the Orders.")
      }
    } catch (error) {
      toast.error("Unable to fetch the Orders.")
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${url}/api/order/updateStatus/${orderId}`, { status: newStatus });
      if (response.data.success) {
        fetchOrders(); // Refresh orders after status update
        toast.success(response.data.message);
      } else {
        toast.error('Unable to update the order status');
      }
    } catch (error) {
      toast.error('Unable to update the order status');
    }
  };

  return (
<div className="orders-container">
      <h2>Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-item" key={order._id}>
            <div className="order-details">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
              <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <div className="order-items">
                <p><strong>Items:</strong></p>
                <ul>
                  {order.items.map((item) => (
                    <li key={`${order._id}-${item.menuItemId._id}`}  className="item-details">
                      <div className="item-field"><strong>Item Name:</strong> {item.menuItemId.name}</div> {/* Replace with actual item name */}
                      <div className="item-field"><strong>Quantity:</strong> {item.quantity}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="order-status">
              <label htmlFor={`status-${order._id}`}>Delivery Status:</label>
              <select id={`status-${order._id}`} value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
