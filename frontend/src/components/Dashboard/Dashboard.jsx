import React, { useState } from 'react';
import './Dashboard.css';
import Orders from './Orders/Orders';
import ModifyMenu from './ModifyMenu/ModifyMenu';

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState(null);

    const handleMenuClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <ul>
                    <li><a href="#modify-items" onClick={() => handleMenuClick('modify-items')}>Modify Items</a></li>
                    <li><a href="#orders" onClick={() => handleMenuClick('orders')}>Orders</a></li>
                </ul>
            </div>
            <div className="main-content">
                {activeComponent === 'modify-items' && <ModifyMenu />}
                {activeComponent === 'orders' && <Orders />}
            </div>
        </div>
    );
};

export default Dashboard;
