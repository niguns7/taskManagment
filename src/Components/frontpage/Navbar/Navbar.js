import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const change = () => {
    let path = '/signup';
    navigate(path);
  }
  return (
   <>
   <div className='navbar'>
    {/* <span className='logo'> Tm </span>
    <div className='navbar-items'>
        <h1>Home</h1>
        <h1>About</h1>
        <h1>contact</h1>
        <button className='nav-button' onClick={change}>Sign-up</button>
        </div> */}
    </div>
   </>
  )
}

export default Navbar;