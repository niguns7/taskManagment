import React from 'react';
import './Register.css';
import bgimg from '../../../assets/loginpimg.jpg';
import { useFormik } from 'formik';
// import { Registerschema } from './Registerschema';
import axios from 'axios';
// import { object } from 'yup';

const Register = () => {
  const initialValues = {
    uname: '',
    fname: '',
    email: '',
    password: '',
    contact: '',
    role: '',
    designation: '',
    file: ''

  }
  // const Postdata = (data) => {
  //  return  axios.post('http://192.168.100.135:8000/users',
  //     {
  //      data,
  //      headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //     })x
  // }


  const Postdata = (formData) => {
    return axios.post('https://c60f-2400-1a00-b060-2e1b-1f65-871-c420-698d.in.ngrok.io/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }


  const onSubmit = async() => {
     const data = {...values}
    const formData=new FormData()
    formData.append('fullname',data.fname)
    formData.append('username',data.uname)
    formData.append('email',data.email)
    formData.append('password',data.password)
    formData.append('contactNo',data.contact)
    formData.append('roles',data.role)
    formData.append('designation',data.designation)
    formData.append('file', data.file);

    console.log(data)

    await Postdata(formData).then((res)=>{
      console.log(res)
    }).catch((err)=>{console.log(err.response)});
    resetForm({ ...initialValues })
  }


  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: initialValues,
    // validationSchema: Registerschema,
    onSubmit,
  });

  return (
    <>

      <form onSubmit={handleSubmit} autoComplete="off" encType='multipart/form-data'>
        <div className='reg-container' >
          <div className='reg-card'>
            <div className='reg'>
              <img src={bgimg} alt="heyheyhey" />
              <div className='reg-items'>
                <h1>Register Users</h1>
                <span>Register user's account here</span>
                <div className='reg-inputs'>

                  <label>Full Name</label>
                  <input
                    placeholder='enter full name'
                    value={values.fname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='fname'
                    name='fname'
                    type='text'
                    className={errors.fname && touched.fname ? "input-error" : ""} />
                  {errors.fname && touched.fname && <p className="error">{errors.fname}</p>}

                  <label>User Name</label>
                  <input
                    placeholder='enter user name'
                    value={values.uname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='uname'
                    name='uname'
                    type='text'
                    className={errors.uname && touched.uname ? "input-error" : ""} />
                  {errors.uname && touched.uname && <p className="error">{errors.uname}</p>}

                  <label>Email</label>
                  <input
                    placeholder='enter email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='email'
                    name='email'
                    type='email'
                    className={errors.email && touched.email ? "input-error" : ""} />
                  {errors.email && touched.email && <p className="error">{errors.email}</p>}

                  <label>Password</label>
                  <input
                    placeholder='enter password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='password'
                    name='password'
                    type='password'
                    className={errors.password && touched.password ? "input-error" : ""} />
                  {errors.password && touched.password && <p className="error">{errors.password}</p>}

                  <label>Contact No.</label>
                  <input
                    placeholder='enter contact no.'
                    value={values.contact}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='contact'
                    name='contact'
                    type='text'
                    className={errors.contact && touched.contact ? "input-error" : ""} />
                  {errors.contact && touched.contact && <p className="error">{errors.contact}</p>}

                  <label>Role</label>
                  <input
                    placeholder='enter Role'
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='role'
                    name='role'
                    type='text'
                    className={errors.role && touched.role ? "input-error" : ""} />
                  {errors.role && touched.role && <p className="error">{errors.role}</p>}

                  <label>Designation</label>
                  <input
                    placeholder='enter desigantion'
                    value={values.designation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='designation'
                    name='designation'
                    type='text'
                    className={errors.designation && touched.designation ? "input-error" : ""} />

                  <label>Image</label>
                  <input
                    placeholder='enter image'
                    value={values.file}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='file'
                    name='file'
                    type='file' />
                    
                  <button type='submit'>Register users</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
export default Register;