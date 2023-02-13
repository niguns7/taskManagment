import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import Authuser from '../../../Forms/Authuser';
import { useQuery } from 'react-query';

const AssignTask = ({ id }) => {

    const { http } = Authuser()

    const Tableschema = yup.object().shape({
        sn: yup.number().positive().required('Required'),
        date: yup.string().required('Required'),
        task: yup.string().required('Required'),
        time: yup.string().required('Required'),
    });

    const iniitialValues = {
        sn: '',
        date: '',
        task: '',
        time: '',
        remarks: '',
        status: 'to_do'
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: iniitialValues,
        validationSchema: Tableschema,

    })

    const body = {
        sn: values.sn,
        date: values.date,
        task: values.task,
        time: values.time,
        remarks: values.remarks,
        status: 'to_do'
    };

    const { refetch } = useQuery("/tasks/admin/assign")

    const Postdata = async () => {
        await http.post(`/tasks/admin/assign/${id}`, body)
        alert("task added")
        refetch()
    }

    const onSubmit = () => {
        Postdata();
        resetForm({ ...iniitialValues })
    };

    return (
        <>
            <div className='task-table' >
                <h1 className='top_head'> Assign task here </h1>
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
                            />
                            <input
                                value={values.date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id='date'
                                name='date'
                                type='date'
                                className={errors.date && touched.date ? "input-errors" : ""}

                            />
                            <input
                                placeholder='Assign tasks'
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
                                value={values.time}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name='time'
                                id='time'
                                type='text'
                                className={errors.time && touched.time ? "input-errors" : ""}
                            />
                            <input
                                placeholder='Remarks'
                                value={values.remarks}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name='remarks'
                                id='remarks'
                                type='text'
                                className={errors.time && touched.time ? "input-errors" : ""}
                            />

                        </div>
                        <button className='table-button' type='submit' onClick={onSubmit}>Add Task</button>
                    </div>

                    <h1 className='middle-heading'>users tasks will displayed here</h1>

                </div>
            </div>
        </>
    )
}

export default AssignTask