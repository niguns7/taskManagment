import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import './UserTasklog.css';
import { useNavigate } from 'react-router-dom';
import Authuser from '../../Forms/Authuser';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const UserTasklog = () => {
  const { getToken, http } = Authuser()

  const [logData, setLogdata] = useState([])
  const [searchedData, setSearcheddata] = useState()


  useEffect(() => {
    http.get(`/tasks/log?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}`).then((Res) => {
      setLogdata(Res?.data?.data)
      console.log('Respons: ', Res?.data?.data)
    }).catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if(searchedData !== undefined){
      setLogdata(searchedData)
    }
    else{
      setLogdata(logData)
    }
  }, [searchedData, logData])

  const imgBaseUrl = `http://192.168.100.135:3000/users/images/${logData.imageUrl}`;

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

  const months = [
    { name: 'January', number: 1 },
    { name: 'February', number: 2 },
    { name: 'March', number: 3 },
    { name: 'April', number: 4 },
    { name: 'May', number: 5 },
    { name: 'June', number: 6 },
    { name: 'July', number: 7 },
    { name: 'August', number: 8 },
    { name: 'September', number: 9 },
    { name: 'October', number: 10 },
    { name: 'November', number: 11 },
    { name: 'December', number: 12 },
  ];

  const startYear = 2023;
  const endYear = new Date().getFullYear() + 10;
  const years = Array.from(new Array(endYear - startYear + 1), (val, index) => startYear + index);


  const iniitialValues = {
    year: '',
    month: '',
  }

  const { values, handleChange, handleBlur } = useFormik({
    initialValues: iniitialValues,
  });


  const Fetchdata = async () => {
    await http.get(`/tasks/log/?year=${parseInt(values.year)}&month=${parseInt(values.month)}`)
      .then(response => {
        if (response.status === 200) {
          setSearcheddata(response?.data?.data)
          // console.log("Response:", response?.data?.data)
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
          <div className='usertasklog_topheading'>
        <div className='td-filter'>
          <label> Enter date:</label>

          <select
            value={values.yaer}
            onChange={handleChange}
            onBlur={handleBlur}
            name='year'
            id='year' >
            <option>Select Year</option>
            {years.map((years, index) => (
              <option key={index} value={years}> {years} </option>
            ))}
          </select>

          <select
            value={values.month}
            onChange={handleChange}
            onBlur={handleBlur}
            name='month'
            id='month' >
            <option>Select Month</option>
            {months.map(({ name, number }) => (
              <option key={number} value={number}>{name}</option>
            ))}
          </select>

          <button onClick={Fetchdata} type='button'>Search</button>
        </div>
      </div>

      <div className='Container'>

        <div className='Sidedrawer'>

          <div className='Heading'>
            <div className='head-img'>
            {imgBaseUrl && <img className='avtar' src={imgBaseUrl} alt='adminavtar' />}

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
        <div className='user-container'>

          <div className='user-cardss'>
            <div className='personal-info'>
              <h1>Personal information</h1>

              <h2> <b>Id: </b>{logData.id}</h2>
              <h2> <b>username: </b>{logData.username}</h2>
              <h2> <b>Fullname: </b>{logData.fullname}</h2>
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