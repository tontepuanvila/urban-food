import React from 'react'
import './Cart.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/storeContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const { cartItems, menuItems, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext)
    const navigate=useNavigate()
  return (
    <div className='cart'>
    <div className="cart-items">
      <div className="cart-items-title">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br />
      <hr />
      {menuItems.map((item, index) => {
        if (cartItems[item._id] > 0) {
          return (
            <div key={index}>
              <div className='cart-items-title cart-items-item'>
                <img src={url+'/images/'+item.image} alt="" />
                <p>{item.name}</p>
                <p>Rs.{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>Rs.{item.price * cartItems[item._id]}</p>
                <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
              </div>
              <hr />
            </div>
          )
        }
      })}
    </div>
    <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
                <p>Subtotal</p>
                <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>Rs.{getTotalCartAmount()===0?0:10}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
                <b>Total</b>
                <b>Rs.{getTotalCartAmount()===0?0:getTotalCartAmount()+10}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/placeOrder')}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
      
    </div>
  )
}

export default Cart
