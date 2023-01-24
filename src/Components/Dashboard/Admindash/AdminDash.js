import React from 'react';
import './AdminDash.css';
import { useNavigate } from 'react-router-dom';
import avtar from '../../../assets/Avtar.png';
import AdminCards from './AdminCards';
import {FaUserAlt} from 'react-icons/fa';
import {FaTasks} from 'react-icons/fa';
import {FaArrowAltCircleLeft} from 'react-icons/fa';

const AdminDash = () => {
  let navigate = useNavigate();

  const changepage = () => {
    let path = '/allusers';
    navigate(path);
  }
  const pageChange = () => {
    let path = '/register';
    navigate(path);
  }
  const pageChange2 = () => {
    let path = '/viewusers';
    navigate(path);
  }
  const CardItems = [
    {
      'img': <FaUserAlt size={70}/>,
      'Title' : 'user',
      'number': '4+',
      onClick: () => pageChange2()
    },
    
    {
      'img': <FaTasks size={70}/>,
      'Title' : 'Tasklog',
      'number': '30',
      onClick: () => changepage()
    },
  ]
  return (
    <>
      <div className='Container'>

        <div className='Sidedrawer'>

          <div className='Heading'>
            <img className='avtar' src={avtar} alt='adminavtar' />
            <h2> John David </h2>
            <h3> Admin </h3>
          </div>
            <ul>
              <li onClick={changepage}><FaArrowAltCircleLeft className='icon'/> Tasklog</li>
              <li onClick={pageChange}><FaArrowAltCircleLeft className='icon'/> Register</li>
            </ul>
        </div>

        <div className='admintop-nav'>
          <h1> Admin-Dashboard </h1>

          {/* <button>Log-out</button> */}
        </div>

      </div>
      <div className='display-items'>

        <div className='display-cards'>
          {
            CardItems.map((items) => {
              return <AdminCards
                img={items.img}
                title={items.Title}
                number={items.number}
                onclick={items.onClick}
              />
            })
          }
        </div>
      </div>

    </>
  )
}

export default AdminDash