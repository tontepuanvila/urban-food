import React, { useContext } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/storeContext';

const Header = () => {
  
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Indulge in Culinary Excellence</h1>
          <p className="hero-description">
            Discover a world of flavors with our expertly crafted dishes, perfect for every craving. 
            Experience deliciousness like never before and elevate your dining experience.
          </p>
          <Link to="/menu">
            <button className="cta-button">Explore Menu</button>
          </Link>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-item">
          
          <h3>Quality Ingredients</h3>
          <p>We use only the freshest ingredients to prepare each dish with utmost care.</p>
        </div>
        <div className="feature-item">
          
          <h3>Wide Selection</h3>
          <p>From appetizers to desserts, explore a wide variety of dishes to suit every taste.</p>
        </div>
        <div className="feature-item">
          
          <h3>Fast Delivery</h3>
          <p>Get your favorite meals delivered to your doorstep, hot and fresh, in no time.</p>
        </div>
      </div>

      <div className="testimonial-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials">
          <div className="testimonial-item">
            <p>"The food was absolutely delicious, and delivery was super quick!"</p>
            <h4>- John D.</h4>
          </div>
          <div className="testimonial-item">
            <p>"I love how easy it is to browse and order. Highly recommend!"</p>
            <h4>- Sarah W.</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
