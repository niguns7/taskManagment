import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Table.css';
import Tanstacktable from './Tanstack_table/Tanstacktable';
import axios from 'axios';
import { useFormik } from 'formik';
import Tableschema from './Tableschema';

const Table = () => {

    const navigate = useNavigate();
    const Goback = () => {
        let path = '/user'
        navigate(path)
    }

    const addTask = (actions, e) => {
        e.preventDefault();

        const submitTask = {
            sn: values.sn,
            date: values.date,
            task: values.task,
            time: values.time,
            timeTaken: values.timeTaken,
            status: values.status,
        }
        setUdata([...udata, submitTask]);
        actions.resetForm();
        Postdata();
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            sn: '',
            date: '',
            task: '',
            time: '',
            timeTaken: '',
            status: '',
        },
        validationSchema: Tableschema,
        addTask,
    });

    // //axios get request
    const [udata, setUdata] = useState([]);

     useEffect(() => {
        axios.get('https://330c-2400-1a00-b060-737-2e1c-f1c4-50e9-917a.in.ngrok.io/tasks')
            .then(response => {
                setUdata(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    //axios post request
    const Postdata = () => {
        axios.post('https://330c-2400-1a00-b060-737-2e1c-f1c4-50e9-917a.in.ngrok.io/tasks',
            {
                sn: values.sn,
                date: values.date,
                task: values.task,
                time: values.time,
                timeTaken: values.timeTaken,
                status: values.status,
            }).then(Response => console.log(Response)).catch(Error => console.log(Error));
    }
    console.log(errors)

    return (
        <>
            <div className='task-table' onSubmit={handleSubmit}>
                <div className='go-back'>
                    <h1 onClick={Goback}>
                        &#60; Go back
                    </h1>
                </div>
                <h1 className='top_head'>  Submit your task here </h1>
                <div className='table_container'>
                    <div className='table-row'>
                        <div className='input-field'>

                            <input
                                placeholder='sn'
                                value={values.sn}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name= "sn"
                                id='sn'
                                type='text'
                            />
                            <input
                                placeholder='date'
                                value={values.date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name= "date"
                                id='date'
                                type='date'
                                className={errors.date && touched.date ? "input-errors" : " "} 
                            />
                            <input
                                placeholder='Task'
                                value={values.task}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name= "task"
                                id='task'
                                type='text'
                                className={errors.task && touched.task ? "input-errors" : " "} 
                            />
                            <input
                                placeholder='estimated time'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name= "time"
                                id='time'
                                type='text'
                                className={errors.time && touched.time ? "input-errors" : " "} 
                            />
                            <input
                                placeholder='Time taken'
                                value={values.timeTaken}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name= "timeTaken"
                                id='timeTaken'
                                type='text'
                                className={errors.timeTakeb && touched.timeTaken ? "input-errors" : " "} 
                            />
                            <select 
                                id="stauts" 
                                name="stauts" 
                                placeholder='status' 
                                value={values.status} 
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                className={errors.status && touched.status ? "input-errors" : " "} >
                                    <option >done</option>
                                    <option >on process</option>
                                    <option >carries over</option>
                                    <option >hold</option>
                                    <option >to do </option>
                            </select>

                        </div>
                        <button className='table-button' onClick={addTask}>Add Task</button>
                    </div>

                    <h1 className='middle-heading'>your tasks will displayed here</h1>

                </div>
                <Tanstacktable usersData={udata} />
            </div>
        </>
    )
}

export default Table