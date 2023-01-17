import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import avtar from '../../../assets/Avtar.png';
import {FaArrowAltCircleLeft} from 'react-icons/fa';

const UserDashboard = () => {
  const navigate = useNavigate();
  const Taskchange = () => {
    let path = '/table';
    navigate(path);
  }

  const changeTask = () => {
    let path = '/usertasklog';
    navigate(path);
  }

  return (
    <>
      <div className='Container'>

        <div className='Sidedrawer'>

          <div className='Heading'>
            <img className='avtar' src={avtar} alt='adminavtar' />
            <h2> John David </h2>
            <h3> user </h3>
          </div>
          <ul>
            <li onClick={Taskchange}><FaArrowAltCircleLeft className='icon' /> TaskTable</li>
            <li onClick={changeTask}><FaArrowAltCircleLeft className='icon' /> Tasklog</li>
          </ul>
        </div>

        <div className='admintop-nav'>
          <h1> user-Dashboard </h1>
        </div>

      </div>
    </>
  )
}

export default UserDashboard;