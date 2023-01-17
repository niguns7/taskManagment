import React from 'react';
import './Allusers.css';
import AllusersCard from './Cards/AllusersCard';
import avtar from '../../../assets/Avtar.png';
import { useNavigate } from 'react-router-dom';

const Allusers = () => {
    const userItems = [
        {
            Image: { avtar },
            sn: 1,
            name: 'john david',
        },
        {
            Image: { avtar },
            sn: 2,
            name: 'tom Cruise',
        },
        {
            Image: { avtar },
            sn: 3,
            name: 'Antionio greezman',
        },
        {
            Image: { avtar },
            sn: 4,
            name: 'Valentino rossi',
        },
        {
            Image: { avtar },
            sn: 5,
            name: 'Lional Messi',
        },
        {
            Image: { avtar },
            sn: 6,
            name: 'De paul',
        },
        {
            Image: { avtar },
            sn: 7,
            name: 'De maria',
        },
        {
            Image: { avtar },
            sn: 8,
            name: 'Salman khan',
        },


    ]

    const navigate = useNavigate();

    const Routechange = () => {
        const path = '/admin'
        navigate(path)
    }
    return (
        <>
            <h2 className='go-back' onClick={Routechange}> &#60; Go back</h2>
            <h1 className='topheading'>Tasklog of All users</h1>
            <div className='allusers-container'>
                <div className='displayuser-card'>
                    {
                        userItems.map((userdata) => {
                            return <AllusersCard
                                image={userdata.Image}
                                Id={userdata.sn}
                                name={userdata.name}
                            />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Allusers;