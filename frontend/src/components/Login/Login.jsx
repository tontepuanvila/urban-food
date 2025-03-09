import React, { useState, useContext } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [currState, setCurrState] = useState("Login");
  const { url, setToken } = useContext(StoreContext);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const validateForm = () => {

    if (currState === "Sign Up" && data.name.trim() === "") {
     toast.error("Name is required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(data.email)) {
    toast.error("Invalid email format");
      return false;
    }

    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    let newUrl = url;
    newUrl += currState === "Login" ? "/api/user/login" : "/api/user/register";

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        login(response.data);
        navigate("/");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className='login'>
      <form onSubmit={onLogin} className="login-container">
        <div className="login-title">
          <h2>{currState}</h2>
          <img src={assets.cross_icon} alt="" />
        </div>

        <div className="login-inputs">
          {currState === "Sign Up" && (
            <>
              <input
                name='name'
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder='Your name'
                required
              />
            </>
          )}

          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder='Your email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder='Password'
            required
          />
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
