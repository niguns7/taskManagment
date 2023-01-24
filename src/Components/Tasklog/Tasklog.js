import React,{useState, useEffect}from 'react';
import './Tasklog.css';
import axios from 'axios';
// import avtar from '../../assets/man.jpg'
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
  
  // const Uuser = [
  //   {
  //     sn: 1,
  //     username: 'dummy',
  //     email: 'jpt@test.com',
  //     taskdone: 3,
  //   },
  // ]

  const [useritems, setUseritems] = useState([])

  useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(Response => {
          setUseritems(Response.data)
          console.log(Response.data)
      })  
      .catch(error => {
          console.log(error);
      })
  }, [])

  const slicedate = useritems.slice(0,1)

  return (
    <>
        <h2 className='go-back'> &#60; Go back</h2>
    <h1 className='topheading'>Tasklog of users</h1>
    <div className='user-container'>
          {
            slicedate.map((uUser) => {
              return (
                <>
                  <div className='user-cardss'>
                    <div className='personal-infoo'>
                      <h1>Personal information</h1>      
                      <img src={uUser.url} className='users-avtar' alt='lmao' />
                      <h2> <b>Id:</b> {uUser.id}</h2>
                      <h2> <b>username:</b> {uUser.id}</h2>
                      <h2> <b>Email:</b>  {uUser.title}</h2>
                      <h2>  <b>Taskdone:</b> {uUser.id}</h2>
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

