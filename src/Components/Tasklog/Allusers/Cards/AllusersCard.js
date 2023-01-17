import React from 'react';
import './AllusersCards.css';
import avtar from '../../../../assets/Avtar.png'
import { useNavigate } from 'react-router-dom';

const AllusersCard = (props) => {
   const navigate = useNavigate();

   const Routechange = () => {
    const path = '/tasklog'
    navigate(path)
   }
  return (
    <div className='allusercard-container'>
        <div className='alluser-card'>
            <div className='allcard-items'>
                <lable>User info</lable>
                    <img src={avtar} alt='aav'></img>
                    <h1><b>Id : </b> {props.Id} </h1>
                    <h1><b>Name : </b> {props.name} </h1>
                    <h2 onClick={Routechange} > View more</h2>
            </div>
        </div>
    </div>
  )
}

export default AllusersCard