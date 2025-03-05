import React, { useContext } from 'react'
import './FoodList.css'
import { StoreContext } from '../../context/storeContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodList = ({category}) => {
    const {menuItems}=useContext(StoreContext)
    console.log(menuItems)
  return (
    <div className='food-display' id='food-display'>
    <h2 className='h2we'>Top dishes near you</h2>
    <div className="food-display-list">
        {menuItems.map((item,index)=>{
          if(category==="All" || category===item.category){
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
          }      
        })}
    </div>
      
    </div>
  )
}

export default FoodList
