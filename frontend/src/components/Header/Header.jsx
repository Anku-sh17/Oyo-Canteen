import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favourite food here</h2>
            <p>Craving something delicious? Explore a variety of mouth-watering dishes from top-rated restaurants, freshly prepared and delivered to your doorstep. Satisfy your hunger with just a few clicks!</p>
            <button style={{cursor:'pointer'}} onClick={()=> window.location.href = '#explore-menu'}>View Menu</button>
        </div>
    </div>
  )
}

export default Header