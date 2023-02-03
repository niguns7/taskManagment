import React from 'react';
import { Navigate } from 'react-router-dom';
import Authuser from './Authuser';


function PrivateRoute({Component}) {

    const {getToken} = Authuser()
    console.log(getToken())
    const tokenString = sessionStorage.getItem('token')
    
    const isLoggedIn = () => {
      if(!tokenString) {
          return false;
      } else {
          return true;
      }
  }

    const auth = isLoggedIn();

    return auth ? Component : <Navigate to  = "/log" />
  }
  
  export default PrivateRoute