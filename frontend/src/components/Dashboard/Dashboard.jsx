import React, { useContext, useState } from 'react';
import './Dashboard.css';
import { Link,Outlet } from 'react-router-dom';
const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <ul>
                    <li><Link to="/dashboard">Add Menu</Link></li>
                    <li><Link to="/dashboard/updateMenu">Edit Menu</Link></li>
                    <li><Link to="/dashboard/orders">Orders</Link></li>
                </ul>
            </div>
            <div className="main-content">
                <Outlet /> {/* This will render the nested route components */}
            </div>
        </div>
    );
};

export default Dashboard;
