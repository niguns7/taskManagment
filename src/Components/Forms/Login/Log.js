import { useFormik } from 'formik';
import React from 'react';
import './Log.css';
import bgimg from '../../../assets/loginpimg.jpg';
import Basicschemas from '../Schema';
import Authuser from '../Authuser';
import { useNavigate } from 'react-router-dom';


const Log = () => {
  const navigate = useNavigate()
  
  const {http,setToken,getToken,token,user} = Authuser()

  const loginHandler=() => {
    if(!token && !user?.username === values?.username){
      alert("user not found")
    }
    else if(token && user?.roles === "admin"){
      navigate('/admin')
      alert("welcome admin")  
    }
    else if(token && user?.roles === "user"){
      navigate('/user')
      alert("welcome user")
    }

  }

  const submitHandler = () => {
    http.post ('/auth/login', {
      username: values.username,
      password: values.password
    }).then(
      (res) => setToken(res.data.user, res.data.access_token)
    ).catch((err) => console.log(err))
    loginHandler()
  }
  console.log(getToken())

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Basicschemas,
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

                <label>Username</label>
                <input
                  placeholder='enter username'
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='username'
                  type='username'
                  className={errors.usename && touched.usename ? "input-errors" : " "} />
                <label>Password</label>

                <input
                  placeholder='enter Password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='password'
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
