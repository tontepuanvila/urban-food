import React, { useState, useContext } from 'react';
import './FoodList.css';
import { StoreContext } from '../../context/storeContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodList = ({ category }) => {
  // Access menuItems from the StoreContext
  const { menuItems } = useContext(StoreContext);
  
  // State for sorting order and price filter
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterPrice, setFilterPrice] = useState('All');

  // Handle change in sorting order (ascending or descending)
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Handle change in price filter (under, between, or above certain values)
  const handlePriceFilter = (e) => {
    setFilterPrice(e.target.value);
  };

  // Filter items based on price range selection
  const filteredItems = menuItems.filter((item) => {
    if (filterPrice === 'All') return true;
    if (filterPrice === 'Under 500') return item.price < 500;
    if (filterPrice === '500 - 1000') return item.price >= 500 && item.price <= 1000;
    if (filterPrice === 'Above 1000') return item.price > 1000;
  });

  // Sort the filtered items by price based on selected order (ascending or descending)
  const sortedItems = filteredItems.sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    return b.price - a.price;
  });

  return (
    <div className='food-display'>
      {/* Filters for sorting and price range */}
      <div className="filters-container">
        <select onChange={handleSortChange} value={sortOrder}>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <select onChange={handlePriceFilter} value={filterPrice}>
          <option value="All">All Prices</option>
          <option value="Under 500">Under 500</option>
          <option value="500 - 1000">500 - 1000</option>
          <option value="Above 1000">Above 1000</option>
        </select>
      </div>

      <h2 className="h2we">Top dishes near you</h2>

      {/* Mapping through sorted and filtered items to display them */}
      <div className="food-display-list">
        {sortedItems.map((item) => {
          // Display items based on selected category filter
          if (category === "All" || category === item.category) {
            return <FoodItem key={item._id} 
              id={item._id} 
              name={item.name} 
              price={item.price ?? 0}  // Default to 0 if price is undefined
              description={item.description ?? 'No description available'} // Default description
              image={item.image ?? 'default-image.png'}  // Default image if not provided
              availability={item.availability ? "available" : "unavailable"} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodList;
