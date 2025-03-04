import React, { useContext } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/storeContext'

const Header = () => {
  const {setMenu}=useContext(StoreContext)
  return (
    <div className='header'>
      <div className="header-contents">
            <h2>Order your favorite food here</h2>
            <p>Choose from a diverse menu featuring a delactable array of dishes crafted with the finest ingredients and satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            <Link to='/menu'><button onClick={()=>setMenu("menu")} className='buttonwl'>View Menu</button></Link>
      </div>
    </div>
  )
}

export default Header
