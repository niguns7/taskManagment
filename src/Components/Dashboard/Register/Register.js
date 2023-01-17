  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import './Register.css'

  const Tasktable = () => {

    const [uname, Setuname] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [contact, setContact] = useState('');
    const [designation, setDesignation] = useState('');
    const [uploadimg, setUploadImg] = useState('');

    const [data, Setdata] = useState([]);

    const resetData = () => {
      uname('')
      email('')
      password('')
      contact('')
      designation('')
    }

    const submitData = (e) => {
      e.preventDefault();
      
      const dataSubmittion = {
        uname: uname,
        email: email,
        password: password,
        contact: contact,
        designation: designation,
        uploadimg: uploadimg,
      };
      Setdata([...data, dataSubmittion]);
      console.log(data)
      alert('user Registered')
      resetData();
    };

    const navigate = useNavigate();

    const RouteChange = () => {
      let path = '/viewusers';
      navigate(path);
    }


    return (
      <>
        <div className='register-container'>
          <div className='register-form'>
            <h1>Register user</h1>
            <div className='register-field'>
            <label htmlFor="fname">User name</label>
            <input
              type="text"
              id="fname"
              name="firstname"
              placeholder="enter your name.."
              value={uname}
              onChange={(e) => Setuname(e.target.value)} />

            <label htmlFor="lname">email</label>
            <input type="text"
              id="lname"
              name="lastname"
              placeholder="enter your email.."
              value={email}
              onChange={(e) => SetEmail(e.target.value)} />

            <label htmlFor="lname">password</label>
            <input type="text"
              id="lname"
              name="lastname"
              placeholder="enter your password."
              value={password}
              onChange={(e) => SetPassword(e.target.value)} />

            <label htmlFor="lname">Contact no.</label>
            <input type="text"
              id="lname"
              name="lastname"
              placeholder="enter contact no."
              value={contact}
              onChange={(e) => setContact(e.target.value)} />

            <label htmlFor="lname">Designation</label>
            <input type="text"
              id="lname"
              name="lastname"
              placeholder="enter Role"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)} />

            <label htmlFor="lname">Choose image</label>
            <input 
              className='uploadimg'
              type="file"
              id="img"
              name="img" 
              accept="image/*" 
              value={uploadimg}
              onChange={(e) => setUploadImg(e.target.value)}/>

              <button onClick={submitData}> Register user</button>
              <span onClick={RouteChange}> View user </span>
            </div>
          </div>
        </div>

      </>
    )
  }

  export default Tasktable;