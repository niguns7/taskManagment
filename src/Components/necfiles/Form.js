import { useFormik } from 'formik';
import React from 'react';
import './Form.css'
import { Signupschema } from './SignupSchemas';

const Formic = () => {

  const initialValues = {
    email: "",
    password: "",
    confirmpassword: ""
  }

  const { values,touched , errors, handleBlur, handleChange, handleSubmit } = useFormik(
    {
      initialValues: initialValues,
      validationSchema: Signupschema,
      onSubmit: (values) => {
        console.log(values)
      }
    }
  )
  console.log(errors);

  return (
    <>
      <form >
        <div className='loginpage'>
          <div className='page-card'>

            <h1>Login</h1>

            <div className='placeholders'>

              <h2>email</h2>
              <input
                placeholder='enter username'
                name='email'
                id='email'
                type='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && <p className="error-message">{errors.email}</p>}

              <h2>PassWord</h2>
              <input
                placeholder='enter Password'
                name='password'
                id='password'
                type='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur} />
              {errors.password && <p className="error-message">{errors.password}</p>}
              <h2>confirm PassWord</h2>
              <input
                placeholder='comfirm password'
                name='confirmpassword'
                id='confirmpassword'
                type='password'
                value={values.confirmpassword}
                onChange={handleChange}
                onBlur={handleBlur} />
            </div>
            {errors.confirmpassword && <p className="error-message">{errors.confirmpassword}</p>}

            <button type='button' className='login-button' onClick={handleSubmit}>login</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Formic;