import React from 'react'
import './Navbar.css'
import { assets } from './../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
        <div style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>OYO-CANTEEN </div>
        <img src={assets.profile_image} alt="" className="profile" />
    </div>
  )
}

export default Navbar