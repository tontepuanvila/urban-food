import React, { useContext } from 'react';
import './Dashboard.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();  // To check the current route
  
  // Check if the current location is the root dashboard path
  const isDashboardRoot = location.pathname === '/dashboard';

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
          {user.role === 'admin' && <li><Link to="/dashboard/addMenu">Add Menu</Link></li>}
          <li><Link to="/dashboard/updateMenu">Edit Menu</Link></li>
          <li><Link to="/dashboard/orders">Orders</Link></li>
        </ul>
      </div>

      <div className="main-content">
        {/* Only show the default content when no child route is active */}
        {isDashboardRoot && (
          <div className="default-content">
            <h2>Welcome to the Dashboard</h2>
            <p>Choose an option from the sidebar to manage the menu or view orders.</p>
          </div>
        )}
        
        <Outlet /> {/* This will render the nested route components */}
      </div>
    </div>
  );
};

export default Dashboard;
