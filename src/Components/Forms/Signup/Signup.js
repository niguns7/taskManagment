import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {

  const navigate = useNavigate();

  const [companyname, setConpanyname] = useState('');
  const [data,Setdata] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
      
    const dataSubmittion = {
      companyname: companyname,
    };
    debugger
    Setdata([...data, dataSubmittion]);
    console.log(data)
    navigate('/admin')
  }

  return (
    <>
    <div className='signup-container'>
        <span className='logo'> TM </span>
        <div className='signup-body'> 
        <lable> Sign up</lable>
            <h1>By signing up, I agree to the Privacy Policy and Terms of Service.</h1>
            <input 
              type='text' 
              placeholder='name@company.com'
              value={companyname}
              onChange= {(e) => setConpanyname(e.target.value) } />
            <button onClick={submitForm}>Sign up</button>
        </div>
    </div>
    </>
  )
}

export default Signup