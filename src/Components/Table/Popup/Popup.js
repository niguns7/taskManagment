import React, { useEffect, useMemo, useState } from 'react';
import './Popup.css';
import { CgCloseO } from 'react-icons/cg'
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import Authuser from '../../Forms/Authuser';

const Popup = ({ closeMode, selecteddata, selectedValue }) => {
console.log(selecteddata)
    const [id, setId] = useState(selectedValue);

    useEffect(() => {
      setId(selectedValue);
    }, [selectedValue])


    console.log("selectedvalue: ", selectedValue)
    console.log("type:", typeof(selectedValue))

    const { getToken, http } = Authuser()

    const itemdata = useMemo(() => {
        return {
            id: selecteddata?.selecteddata?.id,
            sn: selecteddata?.selecteddata?.sn,
            fdate: selecteddata?.selecteddata?.date,
            task: selecteddata?.selecteddata?.task,
            Estime: selecteddata?.selecteddata?.time,
            timeTaken: selecteddata?.selecteddata?.timeTaken,
            remarks: selecteddata?.selecteddata?.remarks,
            status: selecteddata?.selecteddata?.status,

        }
    }, [selecteddata])

    console.log("selecteddata: ", selecteddata)
    console.log("itemdata", itemdata)

    const initialValues = itemdata;

    const PopupSchema = yup.object().shape({
        sn: yup.number().positive().required('Required'),
        fdate: yup.string().required('Required'),
        task: yup.string().required('Required'),
        Estime: yup.string().required('Required'),
        timeTaken: yup.string().required('Required'),
        status: yup.string().required('Required'),
    });

    const onSubmit = async () => {
        resetForm({ ...itemdata })
        putdata(values.id)
        alert("data editted")
        closeMode()
    };

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: PopupSchema,
        onSubmit
    })

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    };

    const body = {
        sn: values.sn,
        date: values.fdate,
        task: values.task,
        time: values.Estime,
        timeTaken: values.timeTaken,
        remarks: values.remarks,
        status: values.status,
    }

    const putdata = () => {
        http.put(`/tasks/update/${id}`, body, { headers: headers })
            .then(response => {

                console.log("response: ", response?.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <>
            <div className='model-wrapper'>
                <div className='popup-container'>
                    <div className='pop-items'>
                        <div className='head-itemss'>
                            <h1> Edit tasks </h1>
                            <i onClick={closeMode}> <CgCloseO size={25} /> </i>
                        </div>
                        <div className='pop-inputs'>
                            <input
                                placeholder='sn'
                                value={values.sn}
                                onChange={handleChange}
                                name='sn'
                                id='sn'
                                type='number'
                                className={errors.sn && touched.sn ? "input-errors" : ""}
                            />
                            <input
                                value={values.fdate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id='fdate'
                                name='fdate'
                                type='date'
                                className={errors.fdate && touched.fdate ? "input-errors" : ""}
                            />
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
                            <input
                                placeholder='Estimated time(in min)'
                                value={values.Estime}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name='Estime'
                                id='Estime'
                                type='number'
                                className={errors.time && touched.time ? "input-errors" : ""}
                            />

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
                            <select
                                value={values.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name='status'
                                id='status' >
                                <option > status </option>
                                <option >done</option>
                                <option >on_process</option>
                                <option >carried_over</option>
                                <option >hold</option>
                                <option >to_do </option>
                            </select>
                            <button type='button' onClick={onSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Popup