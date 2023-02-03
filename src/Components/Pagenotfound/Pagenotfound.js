import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from "../../assets/pnf.jpg";
import "./Pagenotfound.css"

const Pagenotfound = () => {
    const navigate = useNavigate()

    const clickHandler = () => {
        navigate('/')
    }
  return (
    <>
        <div className='page-container'>
            <div className='pageitems'>
            <img src={image} alt='page_not_found'/>
            </div>
            <h1>Opps .... sorry, page not found</h1>
            <button onClick={clickHandler}> Go back</button>
        </div>
    </>
  )
}

export default Pagenotfound