import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserTasklog.css';
import { useNavigate } from 'react-router-dom';
import Authuser from '../../Forms/Authuser';
import {FaArrowAltCircleLeft} from 'react-icons/fa';

const UserTasklog = () => {
  const {getToken} = Authuser()

  const [logData, setLogdata] = useState([])

    const headers = { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
  };

      useEffect(() =>{
        axios.get('http://192.168.100.135:3000/tasks/log', {headers: headers}).then((Res) => {
          setLogdata(Res?.data?.data)
          console.log('Respons: ',Res?.data?.data)
        }).catch((err) => console.log(err))
      }, [])

      const imgBaseUrl = `http://192.168.100.135:80/${logData.imageUrl}`;


  const [style, setStyle] = useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${logData.percent}%`  
    }
    setStyle(newStyle);
  }, 100)


  const navigate = useNavigate();
  const Taskchange = () => {
    let path = '/table';
    navigate(path);
  }

  const changeTask = () => {
    let path = '/user';
    navigate(path);
  }


  return (
    <>
      <div className='Container'>

      <div className='Sidedrawer'>

      <div className='Heading'>
            <div className='head-img'>
              <img className='avtar' src={imgBaseUrl} alt='adminavtar' />
            </div>
            <div className='head-items'>
              <h2>{logData.fullname}</h2>
              <h3> User </h3>
            </div>
          </div>
<ul>
  <li onClick={Taskchange}><FaArrowAltCircleLeft className='icon' /> TaskTable</li>
  <li onClick={changeTask}><FaArrowAltCircleLeft className='icon' /> goback</li>
</ul>
</div>
      </div>

      <div className='user-tasklog'>
        <h2> Your Tasklog </h2>
        <div className='user-container'>
        
                            <div className='user-cardss'>
                            <div className='personal-info'>
                              <h1>Personal information</h1>
        
                              <img src={imgBaseUrl} className='users-avtar' alt='lmao' />
                              <h2> <b>Id: </b>{logData.id}</h2>
                              <h2> <b>username: </b>{logData.username}</h2>
                              <h2> <b>Email: </b>{logData.email}</h2>
                              <h2>  <b>Total tasks:</b> {logData.totaltask}</h2>
                              <h2>  <b>Taskdone: </b> {logData.taskdone}</h2>
                            </div>
                            <div className='user-progress'>
                              <h1> Your progress bar</h1>
                              <div className='task-progree-bar'>
                                <div className='task-progress'>
                                  <div className='task-progress-done' style={style}> {logData.percent}%</div>
                                </div>
                              </div>
                            </div>
                          </div>      
        </div>

      </div>
    </>
  )
 }

export default UserTasklog;