import React, { useContext } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/storeContext'

const Navbar = ({setShowLogin}) => {
  const {getTotalCartAmount,setMenu,menu,token,setToken}=useContext(StoreContext)
  const navigate=useNavigate()
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }



  return (
    <div className='navbar img-position-change'>
      <Link to='/' onClick={()=>setMenu("home")}><img src={assets.logo} alt="" className='logo img-style-change'/></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <Link to='/menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</Link>
        <Link to='/dashboard' onClick={()=>setMenu("dashboard")} className={menu==="dashboard"?"active":""}>Dashboard</Link>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" className="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" className="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>

        </div>
        {!token?<button className='signbutton'>sign in</button>
            :<div className='navbar-profile'>
              <img src={assets.profile_icon} className='white-filter' alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
              </div>}
      </div>

    </div>
  )
}

export default Navbar
