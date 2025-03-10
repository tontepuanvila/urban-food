import React, { useContext, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Cart from './pages/Cart/Cart';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import AddMenu from './components/Dashboard/AddMenu/AddMenu';
import ModifyMenu from './components/Dashboard/ModifyMenu/ModifyMenu';
import MenuItem from './components/Dashboard/ModifyMenu/MenuItem/MenuItem';
import Orders from './components/Dashboard/Orders/Orders';
import Menu from './pages/Menu/Menu';
import MyOrders from './pages/MyOrders/MyOrders';
import UnauthorizedPage from './pages/Unauthorized/UnauthorizedPage';
import { StoreContext } from './context/storeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { url, fetchMenuItems } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/'); // Redirect to the home page on initial load
  }, []);

  return (
    <>
      <div className='app'>
        <ToastContainer />
        <Navbar />
        <Routes>
          {/* Routes for main pages */}
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeOrder' element={<PlaceOrder />} />
          <Route path='/myOrders' element={<MyOrders />} />
          
          {/* Protected routes for admin and manager */}
          <Route path='/dashboard/*' element={<ProtectedRoute roles={['manager', 'admin']} />}>
            <Route path='' element={<Dashboard />}>
              <Route path='addMenu' element={<ProtectedRoute roles={['admin']} />}>
                <Route path='' element={<AddMenu url={url} fetchMenuItems={fetchMenuItems} />} />
              </Route>
              <Route path='updateMenu' element={<ModifyMenu url={url} fetchMenuItems={fetchMenuItems} />} />
              <Route path='editItem/:id' element={<MenuItem url={url} fetchMenuItems={fetchMenuItems} />} />
              <Route path='orders' element={<Orders url={url} />} />
            </Route>
          </Route>

          {/* Login and Unauthorized pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
