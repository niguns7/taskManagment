import React from 'react';
import './AdminCard.css'

const AdminCards = (props) => {


    return (
        <>
        <div className='admin-card-container'>
            <div className='admin-cards'>
                <div className='fa-icon'>
                    {props.img}
                </div>
                <div className='card-items'>
                    <h1 > {props.title} </h1>
                    <h2>{props.number} </h2>
                    <h3 onClick={props.onclick}> View more </h3>
                </div>
            </div>
            </div>
        </>
    )
}

export default AdminCards;