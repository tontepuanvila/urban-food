import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
    <div className="footer-content">
      <div className="footer-content-left">
          <img className='logofooter' src={assets.logo} alt="" />
          <p>Fast, fresh, and convenient meals delivered right to your doorstep.</p>
      </div>
      <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
      </div>
      <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-9376435488</li>
            <li>contact@urbanfood.com</li>
          </ul>
      </div>
    </div>
    <hr/>
    <p className='footer-copyright'>Copyright 2024 © Urbanfood.com - All rights reserved.</p>
      
    </div>
  )
}

export default Footer
