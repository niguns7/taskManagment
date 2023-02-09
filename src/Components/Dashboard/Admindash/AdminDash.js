import React, { useState } from 'react';
import './AdminDash.css';
import { useNavigate } from 'react-router-dom';
import avtar from '../../../assets/Avtar.png';
import AdminCards from './AdminCards';
import { FaUserAlt } from 'react-icons/fa';
import { FaTasks } from 'react-icons/fa';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import Authuser from '../../Forms/Authuser';
import axios from 'axios';

const AdminDash = () => {
  const { http } = Authuser()

  const logout = () => {
    sessionStorage.clear('token')
    navigate('/')
    console.log("logged out")
  }

  const [pagedata, setPagedata] = useState([])
  useState(() => {
    http.get('/users/admin/me/data')
      .then((res) => {
        setPagedata(res?.data?.data)
        console.log(res?.data?.data)
      }).catch((err) => console.log(err))
  })


  const imgBaseUrl = `http://192.168.100.135:80/${pagedata.imageUrl}`;


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
      'img': <FaUserAlt size={70} />,
      'Title': 'Users',
      'number': `Total users: ${pagedata.totalUser}`,
      onClick: () => pageChange2()
    },

    {
      'img': <FaTasks size={70} />,
      'Title': 'Tasklog',
      'number': `Total tasklog: ${pagedata.totalUser}`,
      onClick: () => changepage()
    },
  ]
  return (
    <>
      <div className='Container'>

        <div className='Sidedrawer'>

          <div className='Heading'>
            <div className='head-img'>
              <img className='avtar' src={imgBaseUrl} alt='adminavtar' />
            </div>
            <div className='head-items'>
              <h2>{pagedata.fullname}</h2>
              <h3> Admin </h3>
            </div>
          </div>
          <ul>
            <li onClick={changepage}><FaArrowAltCircleLeft className='icon' /> Tasklog</li>
            <li onClick={pageChange}><FaArrowAltCircleLeft className='icon' /> Register</li>
            <button onClick={logout}>Log-out</button>
          </ul>
        </div>

        <div className='admintop-nav'>
          <h1> Admin-Dashboard </h1>
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