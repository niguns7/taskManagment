import React from 'react';
import './Frontpage.css'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import bg from '../../assets/vectoring.jpg'
const Frontpage = () => {

  let navigate = useNavigate();

  const Changepage = () => {
    let path = '/log';
    navigate(path);
  }


  return (
    <>
      <Navbar />
      <div className='fp-container'>
        <div className='fp-items'>
          <h1 className='title'> Task Management</h1>
          <p>
          we provides structure and control of the project environment 
          so that the agreed activities will produce the right products 
          or services to meet the customers expectations.</p>
          <button className='but' onClick={Changepage}> Get Started</button>
        </div>
        <img src={bg} alt='adsjkl' />
      </div>

    </>
  )
}

export default Frontpage