import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Table.css';
import Tanstacktable from './Tanstack_table/Tanstacktable';
import axios from 'axios';

const Table = () => {

    const [sn, setSn] = useState('');
    const [date, setDate] = useState('');
    const [task, setTask] = useState('');
    const [time, setTime] = useState('');
    const [timeTaken, setTimetaken] = useState('');
    const [status, setStatus] = useState('');

    const resetHandler = () => {
        setSn("");
        setDate("");
        setTask("");
        setTime("");
        setTimetaken("");
        setStatus("");
    }

    const addTask = (e) => {
        e.preventDefault();

        const submitTask = {
            sn: sn,
            date: date,
            task: task,
            time: time,
            timeTaken: timeTaken,
            status: status,
        }
        setUdata([...udata, submitTask]);
        resetHandler();
        Postdata();
    };

    const navigate = useNavigate();
    const Goback = () => {
        let path = '/user'
        navigate(path)
    }

    //axios get request
    const [udata, setUdata] = useState([]);

    useEffect(() => {
      axios.get('https://1b66-2400-1a00-b060-737-2e1c-f1c4-50e9-917a.in.ngrok.io/tasks')
        .then(response => {
          setUdata(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    //axios post request
    const Postdata = () => {
        axios.post('https://1b66-2400-1a00-b060-737-2e1c-f1c4-50e9-917a.in.ngrok.io/tasks',
            {
                sn: sn,
                date: date,
                task: task,
                time: time,
                timeTaken: timeTaken,
                status: status,
            }).then(Response => console.log(Response)).catch(Error => console.log(Error));
    }

    return (
        <>
            <div className='task-table'>
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
                                id='sn'
                                placeholder='sn'
                                value={sn}
                                onChange= {(e) => setSn(e.target.value)}
                                type='text'
                            />
                            <input
                                id='date'
                                placeholder='date'
                                value={date}
                                onChange= {(e) => setDate(e.target.value)}
                                type='date'
                            />
                            <input
                                id='task'
                                placeholder='task'
                                value={task}
                                onChange= {(e) => setTask(e.target.value)}
                                type='text'
                            />
                            <input
                                id='time'
                                placeholder='estimated time'
                                value={time}
                                onChange= {(e) => setTime(e.target.value)}
                                type='text'
                            />
                            <input
                                id='timeTaken'
                                placeholder='timeTaken'
                                value={timeTaken}
                                onChange= {(e) => setTimetaken(e.target.value)}
                                type='text'
                            />
                            <select id="stauts" name="stauts" placeholder='status' value={status} onChange= {(e) => setStatus(e.target.value)}>
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