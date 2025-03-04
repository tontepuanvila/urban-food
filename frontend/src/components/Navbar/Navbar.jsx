import React, { useContext } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/storeContext'

const Navbar = ({setShowLogin}) => {
  const {getTotalCartAmount,setMenu,menu}=useContext(StoreContext)
  const navigate=useNavigate()


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
        <button onClick={()=>{navigate('/login');setMenu("home")}}>Sign in</button>
      </div>

    </div>
  )
}

export default Navbar
