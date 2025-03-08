import React, { useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/storeContext'
import { useAuth } from '../../context/AuthContext'
import { NavLink,Link } from 'react-router-dom' // Import NavLink from react-router-dom

const Navbar = () => {
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
  const navigate = useNavigate()
  const { logoutUser } = useAuth()

  const logout = () => {
    logoutUser()
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }

  return (
    <div className='navbar img-position-change'>
      <Link to='/'><img src={assets.logo} alt="" className='logo img-style-change' /></Link>
      <ul className='navbar-menu'>
        <NavLink 
          to='/' 
          end // Use 'end' for exact matching with the home page
          className={({ isActive }) => isActive ? 'active' : ''} // Dynamically set class based on route
        >
          Home
        </NavLink>
        <NavLink 
          to='/menu' 
          className={({ isActive }) => isActive ? 'active' : ''} 
        >
          Menu
        </NavLink>
        <NavLink 
          to='/dashboard' 
          className={({ isActive }) => isActive ? 'active' : ''} 
        >
          Dashboard
        </NavLink>
        
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => navigate('/login')} className='signbutton'>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} className='white-filter' alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myOrders')}>
                <img src={assets.bag_icon} alt="" /><p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" /><p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
