import React,{useState} from 'react'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodList from '../../components/FoodList/FoodList';

const Menu = () => {
    const [category,setCategory] = useState("All");
    return (
      <div>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodList category={category}/>
      </div>
    )
}

export default Menu
