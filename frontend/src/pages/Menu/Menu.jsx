import React, { useState } from 'react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodList from '../../components/FoodList/FoodList';

const Menu = () => {
  // State to manage the selected category for food items
  const [category, setCategory] = useState("All");

  return (
    <div>
      {/* ExploreMenu allows users to choose a category */}
      <ExploreMenu category={category} setCategory={setCategory} />
      {/* FoodList fetches and displays items based on selected category */}
      <FoodList category={category} />
    </div>
  );
};

export default Menu;
