import React, { useEffect, useMemo, useState } from 'react';
import './Upopup.css';
import { CgCloseO } from 'react-icons/cg'
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import Authuser from '../../../Components/Forms/Authuser';
import { useQuery } from 'react-query';

const Upopup = ({ closeMode, selecteddata, selectedValue }) => {
    console.log(selecteddata)
    console.log(selectedValue)
    const [id, setId] = useState(selectedValue);

    useEffect(() => {
        setId(selectedValue);
    }, [selectedValue])


    console.log("selectedvalue: ", selectedValue)
    console.log("type:", typeof (selectedValue))

    const { http } = Authuser()

    const itemdata = useMemo(() => {
        return {
            uname: selecteddata?.selecteddata?.username,
            fname: selecteddata?.selecteddata?.fullname,
            email:  selecteddata?.selecteddata?.email,
            password:  selecteddata?.selecteddata?.password,
            contact:  selecteddata?.selecteddata?.contactNo,
            role:  selecteddata?.selecteddata?.roles,
            designation:  selecteddata?.selecteddata?.designation,
        }
    }, [selecteddata])

    console.log("selecteddata: ", selecteddata)
    console.log("itemdata", itemdata)

    const initialValues = itemdata;

    const PopupSchema = yup.object().shape({
        uname: yup.number().positive().required('Required'),
        fname: yup.string().required('Required'),
        email: yup.string().required('Required'),
        password: yup.string().required('Required'),
        contact: yup.number().required('Required'),
        role: yup.string().required('Required'),
        designation: yup.string().required('Required'),
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

    const body = {
        username: values.uname,
        fullname: values.fname,
        email: values.email,
        password: values.password,
        contactNo: values.contact,
        roles: values.role,
        designation: values.designation,
    }

    const {refetch} = useQuery('users/update')

    const putdata = () => {
        http.put(`/users/update/${id}`, body)
        refetch()
    }


    return (
        <>
            <div className='model-wrapper'>
                <div className='popup-container'>
                    <div className='pop-items'>
                        <div className='head-itemss'>
                            <h1> Edit Users </h1>
                            <i onClick={closeMode}> <CgCloseO size={25} /> </i>
                        </div>
                        <div className='regpop-inputs'>
                            <input
                                placeholder='enter full name'
                                value={values.fname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id='fname'
                                name='fname'
                                type='text'
                                className={errors.fname && touched.fname ? "input-error" : ""} />

                            <input
                                placeholder='enter user name'
                                value={values.uname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id='uname'
                                name='uname'
                                type='text'
                                className={errors.uname && touched.uname ? "input-error" : ""} />

                            <input
                                placeholder='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id='email'
                                name='email'
                                type='email'
                                className={errors.email && touched.email ? "input-error" : ""} />

                            <input
                                placeholder='enter password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id='password'
                                name='password'
                                type='password'
                                className={errors.password && touched.password ? "input-error" : ""} />

                            <input
                                placeholder='enter contact no.'
                                value={values.contact}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id='contact'
                                name='contact'
                                type='text'
                                className={errors.contact && touched.contact ? "input-error" : ""} />

                            <select
                                placeholder='enter Role'
                                value={values.role}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id='role'
                                name='role'
                                type='text'
                                className={errors.role && touched.role ? "input-error" : ""} >
                                <option > user  </option>
                                <option >admin</option>
                            </select>

                            <input
                                placeholder='enter desigantion'
                                value={values.designation}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id='designation'
                                name='designation'
                                type='text'
                                className={errors.designation && touched.designation ? "input-error" : ""} />

                            <button type='button' onClick={onSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Upopup