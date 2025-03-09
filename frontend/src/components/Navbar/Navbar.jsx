import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { StoreContext } from '../../context/storeContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const { logoutUser, user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  const logout = () => {
    logoutUser();
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  return (
    <nav className='navbar'>
      <Link to='/'><img src={assets.logo} alt="Logo" className='logo' /></Link>

      {/* Hamburger Menu Icon */}
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={isMenuOpen ? "bar open" : "bar"}></div>
        <div className={isMenuOpen ? "bar open" : "bar"}></div>
        <div className={isMenuOpen ? "bar open" : "bar"}></div>
      </div>

      {/* Navbar Menu */}
      <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
        <NavLink to='/' end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to='/menu' className={({ isActive }) => isActive ? 'active' : ''}>Menu</NavLink>
        {(user?.role === 'admin' || user?.role === 'manager') && 
          <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>}
      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="Cart" /></Link>
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>
        {!token ? (
          <button onClick={() => navigate('/login')} className='signbutton'>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} className='white-filter' alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myOrders')}>
                <img src={assets.bag_icon} alt="Orders" /><p>Orders</p>
              </li>
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" /><p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
