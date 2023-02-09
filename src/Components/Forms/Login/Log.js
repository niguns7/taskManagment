import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BiUserPin, BiLockAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import bgimg from '../../../assets/loginpimg.jpg';
import Authuser from '../Authuser';
import Basicschemas from '../Schema';
import './Log.css';


const Log = () => {
  const navigate = useNavigate()

  const { http, setToken, token, user } = Authuser()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    const storedPassword = sessionStorage.getItem("password");
    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const [showpassword, setShowpassword] = useState(false)

  const handleShowPassword = () => {
    setShowpassword(prevState => !prevState);
  };

  const submitHandler = () => {
    http.post('/users/auth/login', {
      username: values.username,
      password: values.password
    }).then(
      (res) => setToken(res.data.user, res.data.access_token)
    ).catch((err) => console.log(err))
    if (user?.username !== values?.username) {
      alert('user not found!')
    }
    else if (token && user?.roles === "admin") {
      navigate('/admin')
    }
    else if (token && user?.roles === "user") {
      navigate('/user')
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: '',
    },
    validationSchema: Basicschemas,
    submitHandler,
  });




  return (
    <>
      <div className='log-container' onSubmit={handleSubmit} >
        <div className='log-card'>
          <div className='log'>
            <img src={bgimg} alt="heyheyhey" />
            <div className='log-items'>
              <h1>Welcome Here</h1>
              <span> Log- in your account</span>
              <div className='log-inputs'>

                <div className='toop'>
                  <i><BiUserPin size={20} /></i>
                  <label>Username</label>
                </div>

                <input
                  placeholder='enter username'
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='username'
                  type='username'
                  className={errors.username && touched.username ? "input-errors" : " "} />
                {errors.username && touched.username && <p className="error">{errors.username}</p>}

                <div className='toop'>
                  <i><BiLockAlt size={20} /></i>
                  <label>Password</label>
                </div>

                <div className="password-field" >
                  <input
                    placeholder='enter Password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='password'
                    type={showpassword ? 'text' : 'password'}
                    className={errors.password && touched.password ? "input-errors" : " "}
                  />
                  <i onClick={handleShowPassword}>{showpassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}</i>
                </div >
                {errors.password && touched.password && <p className="error">{errors.password}</p>}
              </div>

              <div className='checkout'>

                <input
                  type='checkbox'
                  value={values.remember}
                  onChange={() => setRememberMe(prev => !prev)}
                  onBlur={handleBlur}
                  checked={rememberMe}
                />
                <label>Remember me</label>
              </div>
              <button type='submit' onClick={submitHandler} onKeyDown={(e) => {
                e.keyCode === 13 && submitHandler()
              }}>Login</button>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Log;
