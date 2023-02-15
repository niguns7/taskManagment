import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Img from '../../../assets/welcome.jpg'
import Authuser from '../../Forms/Authuser';
import './UserDashboard.css';

const UserDashboard = () => {
  const { getToken ,http } = Authuser()
  const [pagedata, setPagedata] = useState([])

  const logout = async () => {
    sessionStorage.clear('token')
    alert("you are logging out 'press ok for confirmation' ")
    navigate('/')
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  };

  useEffect(() => {
    http.get('/users/user/me/data', { headers: headers })
      .then((res) => {
        setPagedata(res?.data?.data)
      }).catch((err) => console.log(err))
  }, [])

  const imgBaseUrl = `http://192.168.100.135:3000/users/images/${pagedata.imageUrl}`;

  const navigate = useNavigate();
  const Taskchange = () => {
    let path = '/table';
    navigate(path);
  }

  const changeTask = () => {
    let path = '/usertasklog';
    navigate(path);
  }
  const Getstarted = () => {
    let path = '/table';
    navigate(path);
  }

  return (
    <>
      <div className='Container'>

        <div className='Sidedrawer'>

          <div className='Heading'>
            <div className='head-img'>
            {imgBaseUrl && <img className='avtar' src={imgBaseUrl} alt='adminavtar' />}

            </div>
            <div className='head-items'>
              <h2>{pagedata.fullname}</h2>
              <h3> User </h3>
            </div>
          </div>
          <ul>
            <li onClick={Taskchange}><FaArrowAltCircleLeft className='icon' /> TaskTable</li>
            <li onClick={changeTask}><FaArrowAltCircleLeft className='icon' /> Tasklog</li>
            <button onClick={logout}>Log-out</button>
          </ul>
        </div>

        <div className='admintop-nav'>
          <h1> UserDashboard </h1>
        </div>
        <div className='welcome-container'>
          <div className='wel-items'>
            <img src={Img} alt='adlksj' />
            <div className='well-text'>
              <h1> Welcome back, {pagedata.fullname}!!</h1>
              <p> Hey {pagedata.fullname}, great to seet you on the board,
                Become focused, organized, and calm with your projects.
                Organize your work and life. <span onClick={Getstarted}>Get started</span> with your Tasks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDashboard;