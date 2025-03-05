import React, { useState } from 'react';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([
        { id: 1, name: 'John Doe', price: '$25.00', description: '2x Pizza', category: 'Food', availability: 'Delivered', status: 'Pending' },
        { id: 2, name: 'Jane Smith', price: '$15.00', description: '1x Burger', category: 'Food', availability: 'Delivered', status: 'Processing' },
    ]);

    const [statusOptions] = useState(['Pending', 'Processing', 'Delivered', 'Cancelled']);

    const handleStatusChange = (id, newStatus) => {
        setOrders((prevOrders) => 
            prevOrders.map((order) => 
                order.id === id ? { ...order, status: newStatus } : order
            )
        );
    };

    return (
        <div className="order-container">
            <h2>Order Details</h2>
            <div className="table-responsive">
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Availability</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.name}</td>
                                <td>{order.price}</td>
                                <td>{order.description}</td>
                                <td>{order.category}</td>
                                <td>{order.availability}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
