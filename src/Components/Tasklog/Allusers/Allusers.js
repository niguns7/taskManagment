import React, { useEffect, useState } from 'react';
import './Allusers.css';
import AllusersCard from './Cards/AllusersCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Allusers = () => {

    const [useritems, setUseritems] = useState([])

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/photos')
        .then(Response => {
            {setUseritems(Response.data)}
            console.log(Response.data)
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    const slicedata = useritems.slice(0,16)

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
                        slicedata.map((userdata) => {
                            return <AllusersCard
                                image={userdata.url}
                                Id={userdata.id}
                                name={userdata.title}
                            />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Allusers;