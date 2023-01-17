import React, { useState } from 'react';
import './UserTasklog.css';
import { useNavigate } from 'react-router-dom';
import avtar from '../../../assets/Avtar.png'

const UserTasklog = () => {

  const [style, setStyle] = useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${done}%`
    }
    setStyle(newStyle);
  }, 100)

  let done = 70;

  const Uuser = [
    {
      sn: 1,
      username: 'dummy',
      email: 'jpt@test.com',
      taskdone: 3,
    },
  ]

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

        <div className='Sidedrawer '>

          <div className='Heading'>
            <img className='avtar' src={avtar} alt='adminavtar' />
            <h2> David John </h2>
            <h3> user </h3>
          </div>
          <ul onClick={Taskchange}> Task table  </ul>
          <ul onClick={changeTask}>  Tasklog </ul>
        </div>
        <div className='div_cards'>
        </div>
      </div>

      <div className='user-tasklog'>
        <h2> Your Tasklog </h2>
        <div className='user-container'>
          {
            Uuser.map((uUser) => {
              return (
                <>
                  <div className='user-cardss'>
                    <div className='personal-info'>
                      <h1>Personal information</h1>

                      <img src={avtar} className='users-avtar' alt='lmao' />
                      <h2> <b>sn:</b> {uUser.sn}</h2>
                      <h2> <b>username:</b> {uUser.username}</h2>
                      <h2> <b>Email:</b>  {uUser.email}</h2>
                      <h2>  <b>Taskdone:</b> {uUser.taskdone}</h2>
                    </div>
                    <div className='user-progress'>
                      <h1> Your progress bar</h1>
                      <div className='task-progree-bar'>
                        <div className='task-progress'>
                          <div className='task-progress-done' style={style}> {done}% </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>

      </div>
    </>
  )
}

export default UserTasklog;