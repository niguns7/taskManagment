import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Authuser from '../Forms/Authuser';
import './Tasklog.css';

const Tasklog = () => {
  const id = useParams()
  const sn = Object.values(id)

  const { getToken } = Authuser()
  const navigate = useNavigate();

  const changePage = () => {
    let path = `/tasks/${sn}`
    navigate(path)
  }
  const PageChange = () => {
    let path = `/allusers`
    navigate(path)
  }

  const [useritems, setUseritems] = useState()

  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${getToken()}`
  }

  useEffect(() => {
    axios.get(`http://192.168.100.135:3000/tasks/admin/log/${sn}`, { headers: headers })
      .then(Response => {
        setUseritems(Response?.data?.data)
        console.log(Response?.data?.data)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const userData = { ...useritems }
  console.log(typeof(userData))

  const [style, setStyle] = useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${userData.percent}%`
    }
    setStyle(newStyle);
  }, 100)

  return (
    <>
      <h2 className='go-back' onClick={PageChange}> &#60; Go back</h2>
      <h1 className='topheading'>Tasklog of users</h1>
      <div className='user-container'>
        <div className='user-cardss'>
          <div className='personal-infoo'>
            <h1>Personal information</h1>
            <h2> <b>Id:</b> {userData.id}</h2>
            <h2> <b>username:</b> {userData.username}</h2>
            <h2> <b>Fullname:</b> {userData.fullname}</h2>
            <h2> <b>Email:</b>  {userData.email}</h2>
            <h2>  <b>Total tasks done:</b> {userData.totaltask}</h2>
            <h2>  <b>Taskdone:</b> {userData.taskdone}</h2>
          </div>
          <div className='user-progress'>
            <h1> Your progress bar</h1>
            <div className='task-progree-bar'>
              <div className='task-progress'>
                <div className='task-progress-done' style={style}> {userData.percent}% </div>
              </div>
            </div>
          </div>
          <h5 onClick={changePage}> View Tasks </h5>
        </div>
      </div>
    </>
  )
};
export default Tasklog;

