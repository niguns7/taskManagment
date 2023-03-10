import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Table.css';
import Tanstacktable from './Tanstack_table/Tanstacktable';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Authuser from '../Forms/Authuser';
import { useQuery } from 'react-query';


const Table = () => {

    const { http } = Authuser()
    const [udata, setUdata] = useState([]);

    const Tableschema = yup.object().shape({
        sn: yup.number().positive().required('Required'),
        date: yup.string().required('Required'),
        task: yup.string().required('Required'),
        time: yup.string().required('Required'),
        status: yup.string().required('Required'),
    });


    const iniitialValues = {
        sn: '',
        date: '',
        task: '',
        time: '',
        timeTaken: null,
        remarks: null,
        status: "to_do",
    }

    const navigate = useNavigate();
    const Goback = () => {
        let path = '/user'
        navigate(path)
    }

    const onSubmit = () => {
        Postdata();
        resetForm({ ...iniitialValues })
    };

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
        initialValues: iniitialValues,
        validationSchema: Tableschema,
        onSubmit
    });

    const fetchdata = async () => {
        const res = await http.get(`/tasks?fromdate=${new Date().toISOString().substring(0, 10)}&todate=${new Date().toISOString().substring(0, 10)}`)
        return res?.data
    }

    const { data: tabdata, refetch } = useQuery("tabdata", () => fetchdata())


    useEffect(() => {
        console.log("ss", tabdata?.data)
        if (tabdata?.data?.length > 0) {
            console.log("ssk", tabdata?.data)
            setUdata(tabdata?.data)
        }
    }, [tabdata])

    console.log("udata", udata)

    const body = {
        sn: values.sn,
        date: values.date,
        task: values.task,
        time: values.time,
        timeTaken: values.timeTaken,
        remarks: values.remarks,
        status: values.status,
        createdAt: new Date().toISOString()
    };

    const Postdata = () => {
        http.post(`/tasks`, body)
        alert("task added")
        refetch()
    }

    return (
        <>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className='task-table' >
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
                                    name='sn'
                                    id='sn'
                                    type='number'
                                    className={errors.sn && touched.sn ? "input-errors" : ""}
                                // {...getFieldProps("sn")}
                                />
                                {/* {errors.sn && touched.sn && <p className="error">{errors.sn}</p>} */}
                                <input
                                    value={values.date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id='date'
                                    name='date'
                                    type='date'
                                    className={errors.date && touched.date ? "input-errors" : ""}

                                />
                                {/* {errors.sn && touched.sn && <p className="error">{errors.sn}</p>} */}
                                <input
                                    placeholder='Task'
                                    value={values.task}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='task'
                                    id='task'
                                    type='text'
                                    className={errors.task && touched.task ? "input-errors" : ""}
                                />
                                {/* {errors.sn && touched.sn && <p className="error">{errors.sn}</p>} */}
                                <input
                                    placeholder='Estimated time(in min)'
                                    value={values.time}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='time'
                                    id='time'
                                    type='number'
                                    className={errors.time && touched.time ? "input-errors" : ""}
                                />
                                {/* {errors.sn && touched.sn && <p className="error">{errors.sn}</p>} */}

                                <input
                                    placeholder='Time taken(in min)'
                                    value={values.timeTaken}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='timeTaken'
                                    id='timeTaken'
                                    type='text'
                                    className={errors.timeTaken && touched.timeTaken ? "input-errors" : ""}
                                />
                                {/* {errors.sn && touched.sn && <p className="error">{errors.sn}</p>} */}
                                <input
                                    placeholder='Remarks'
                                    value={values.remarks}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='remarks'
                                    id='remarks'
                                    type='text'
                                />
                                <select
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='status'
                                    id='status' >
                                    {/* {errors.sn && touched.sn && <p className="error">{errors.sn}</p>} */}
                                    <option > status </option>
                                    <option >done</option>
                                    <option >on_process</option>
                                    <option >carried_over</option>
                                    <option >hold</option>
                                    <option >to_do </option>
                                </select>


                            </div>
                            <button className='table-button' type='submit' onClick={onsubmit}>Add Task</button>
                        </div>

                        <h1 className='middle-heading'>your tasks will displayed here</h1>

                    </div>
                    { udata.length>0 &&
                        <Tanstacktable usersData={udata} body={body} />
                    }
                </div>
            </form>
        </>
    )
}


export default Table
