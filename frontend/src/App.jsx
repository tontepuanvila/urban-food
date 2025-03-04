import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import { useState } from 'react'
import Dashboard from './components/Dashboard/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import ModifyMenu from './components/Dashboard/ModifyMenu/ModifyMenu'
import Orders from './components/Dashboard/Orders/Orders'
import Menu from './pages/Menu/Menu'
import MyOrders from './pages/MyOrders/MyOrders'
import UnauthorizedPage from './pages/UnauthorizedPage'


const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu/>}/>
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeOrder' element={<PlaceOrder />} />
          <Route path='/myOrders' element={<MyOrders/>}/>
          <Route path='/dashboard/*' element={<ProtectedRoute roles={['manager', 'admin']} />}>
          <Route path='' element={<Dashboard />}></Route>
          <Route path='modifyItems' element={<ModifyMenu />} />
          <Route path='orders' element={<Orders />} />
          </Route>
          <Route path="/login" element={<Login setShowLogin={setShowLogin} />} />
          <Route path="/unauthorized" element={<UnauthorizedPage/>} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
