import React, { useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';

const Login = () => {
  const [currState, setCurrState] = useState("Login");

  return (
    <div className='login'>
      <form className="login-container">
        <div className="login-title">
          <h2>{currState}</h2>
          <img src={assets.cross_icon} alt="" />
        </div>
        <div className="login-inputs">
          {currState === "Login" ? <></> : <input name='name' type="text" placeholder='Your name' required />}
          <input name='email' type="email" placeholder='Your email' required />
          <input name='password' type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p className='continuee'>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  );
};

export default Login;
