import React,{useState}from 'react';
import './Tasklog.css';
import avtar from '../../assets/Avtar.png'
import { useNavigate } from 'react-router-dom';

const Tasklog = () => {
  const navigate = useNavigate();
  const changePage = () => {
      let path = '/tasks'
      navigate(path)
  }

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

  return (
    <>
        <h2 className='go-back'> &#60; Go back</h2>
    <h1 className='topheading'>Tasklog of users</h1>
    <div className='user-container'>
          {
            Uuser.map((uUser) => {
              return (
                <>
                  <div className='user-cardss'>
                    <div className='personal-infoo'>
                      <h1>Personal information</h1>      
                      <img src={avtar} className='users-avtar' alt='lmao' />
                      <h2> <b>Id:</b> {uUser.sn}</h2>
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
                    <h5 onClick={changePage}> View Tasks </h5>
                  </div>
                </>
              )
            })
          }
        </div>
    </>
  )
};
export default Tasklog;

