import { useFormik } from 'formik';
import React, { useEffect, useState,createContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Authuser from '../Forms/Authuser';
import './Tasklog.css';


const intialdate = createContext();
const finaldate = createContext();


const Tasklog = () => {
  const [useritems, setUseritems] = useState()
  const [searchedData, setSearcheddata] = useState()

  const id = useParams()
  const sn = Object.values(id)

  const { http } = Authuser()
  const navigate = useNavigate();

  const changePage = () => {
    let path = `/tasks/${sn}`
    navigate(path)
  }
  const PageChange = () => {
    let path = `/allusers`
    navigate(path)
  }

  useEffect(async () => {
    await http.get(`/tasks/admin/log/${sn}?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}`)
      .then(Response => {
        setUseritems(Response?.data?.data)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])


  useEffect(() => {
    if(searchedData !== undefined){
      setUseritems(searchedData)
    }
    else{
      setUseritems(useritems)
    }
  }, [searchedData, useritems])

  const UserData = {...useritems}
  console.log(typeof (UserData))

  //progressbar
  const [style, setStyle] = useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${UserData.percent}%`
    }
    setStyle(newStyle);
  }, 100)

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
    await http.get(`/tasks/admin/log/${sn}?year=${parseInt(values.year)}&month=${parseInt(values.month)}`)
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
      <div className='tasklog_topheading'>
        <h2 className='go-back' onClick={PageChange}> &#60; Go back</h2>
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

      {/* <h1 className='topheading'>Tasklog of users</h1> */}
      <div className='user-container'>
        <div className='user-cardss'>
          <div className='personal-infoo'>
            <h1>Personal information</h1>
            <h2> <b>Id:</b> {UserData.id}</h2>
            <h2> <b>username:</b> {UserData.username}</h2>
            <h2> <b>Fullname:</b> {UserData.fullname}</h2>
            <h2> <b>Email:</b>  {UserData.email}</h2>
            <h2>  <b>Total tasks:</b> {UserData.totaltask}</h2>
            <h2>  <b>Taskdone:</b> {UserData.taskdone}</h2>
          </div>
          <div className='user-progress'>
            <h1> Your progress bar</h1>
            <div className='task-progree-bar'>
              <div className='task-progress'>
                <div className='task-progress-done' style={style}> {UserData.percent}% </div>
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
export {intialdate,finaldate};

