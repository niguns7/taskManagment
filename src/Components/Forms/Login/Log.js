import { useFormik } from 'formik';
import React from 'react';
import './Log.css';
import { useNavigate } from 'react-router-dom';
import bgimg from '../../../assets/loginpimg.jpg';
import Basicschemas from '../Schema';

const Log = () => {

    const navigate =useNavigate();

    const ValidData = [
      {
        email: 'dummy@test.com',
        pass: 'test',
        role: 'Admin'
      },
      {
        email: 'dummy@tester.com',
        pass: 'tester',
        role: 'user'
      },
    ]

    const submitHandler = () =>{
        //await new Promise((resolve) => setTimeout(resolve,1000) )
        const findUser = ValidData.find((val) => val.email === values.email)
        if (!findUser) {
          return alert("User not found")
        }
        if (findUser.pass !==  values.password) {
          return alert('Password incorrect')
        }
        if (findUser.role === 'Admin') {
          navigate('/admin')
        }
        else {
          navigate('/user')
        }
    
      }
    

      
  const { values, errors, touched ,handleBlur, handleChange,handleSubmit} = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmpassword: ''
    },
    validationSchema: Basicschemas,
    submitHandler,
  });
  
    return (
        <>
            <div className='log-container' onSubmit={handleSubmit}>
                <div className='log-card'>
                    <div className='log'>
                        <img src={bgimg} alt="heyheyhey" />
                        <div className='log-items'>
                            <h1>Welcome Here</h1>
                            <span> Log- in your account</span>
                            <div className='log-inputs'>

                                <lable>Email</lable>
                                <input
                                    placeholder='enter email' 
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id='email'
                                    type='email'
                                    className={errors.email && touched.email ? "input-errors" : " "}                                    />
                                <lable>Password</lable>
                                <input
                                    placeholder='enter Password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id='password'
                                    type='password' />

                                <lable>Confirm Password</lable>
                                <input
                                    placeholder='confirm your password'
                                    value={values.confirmpassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id='confirmpassword'
                                    type='password' />
                                <button type='submit' onClick={submitHandler}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Log;