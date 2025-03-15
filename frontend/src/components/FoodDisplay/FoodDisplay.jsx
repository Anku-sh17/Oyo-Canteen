import React, { useContext, useState } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

  const {food_list} = useContext(StoreContext);
  const [search, setSearch] = useState("");
  return (
    <div className='food-display' id='food-display'>
      <div className="food-display-header">
        <h2>Top dishes near you</h2>
        <input type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value); }} className='search-bar'/>
        </div>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
              if(category==='All' || category===item.category){
                if (search === ""){
                  return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                }else if (item.name.toLowerCase().includes(search.toLowerCase())){
                  return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                }
              }
                            })}
        </div>
    </div>
  )
}

export default FoodDisplay