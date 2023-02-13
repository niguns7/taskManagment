import React, { useEffect, useState } from 'react';
import './Allusers.css';
import AllusersCard from './Cards/AllusersCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Authuser from '../../Forms/Authuser';

const Allusers = () => {
    const {http} = Authuser()
    const [useritems, setUseritems] = useState([])

    useEffect (() => {
        http.get('/users/info')
            .then((Res) => {
                setUseritems(Res?.data?.data)
                console.log(Res?.data?.data)
            }).catch((err) => console.log(err))
    }, [])
    console.log(useritems)

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
                        useritems.map((userdata) => {
                            const imgBaseUrl = `http://192.168.100.135:80/${userdata.imageUrl}`;
                            return <AllusersCard
                                image={imgBaseUrl}
                                Id={userdata.id}
                                Role={userdata.role}
                                name={userdata.fullname}
                            />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Allusers;