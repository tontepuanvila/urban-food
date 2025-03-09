import React from 'react';
import './ExploreMenu.css';
import { assets, menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  // Handler for category click to set the active category
  const handleCategoryClick = (categoryName) => {
    setCategory(categoryName);
  };

  return (
    <div className="explore-menu" id="explore-menu">
      {/* Title and description of the explore menu section */}
      <h1 className="h1e">Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes.
      </p>

      {/* Displaying the list of menu items */}
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className={`explore-menu-list-item ${category === item.menu_name ? 'active' : ''}`}  // Highlight active category
            onClick={() => handleCategoryClick(item.menu_name)}  // Set category when clicked
          >
            <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt={item.menu_name} />
            <p className="item_menu">{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
