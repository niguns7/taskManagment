import React from 'react';
import './AllusersCards.css';
import { useNavigate } from 'react-router-dom';

const AllusersCard = (props) => {

  const id = props.Id
  
  const navigate = useNavigate();
  const Routechange = () => {
    const path = `/tasklog/${id}`
    navigate(path)
   }


  return (
    <div className='allusercard-container'>
        <div className='alluser-card'>
            <div className='allcard-items'>
                <label>User info</label>
                    <img src={props.image} alt='aav'></img>
                    <h1><b>Id : </b> {props.Id} </h1>
                    <h1><b>Name : </b> {props.name} </h1>
                    <h1><b>Role : </b> {props.Role} </h1>
                    <h2 onClick={Routechange} > View more</h2>
            </div>
        </div>
    </div>
  )
}

export default AllusersCard