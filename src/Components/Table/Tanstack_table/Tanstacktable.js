import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { MdDelete, MdOutlineDownloadDone } from 'react-icons/md';
import { useTable } from 'react-table';
import Authuser from '../../Forms/Authuser';
import Popup from '../Popup/Popup';
import './Column.css';
import './Tanstacktable.css';

const Tanstacktable = ({ usersData }) => {
    const [openmodel, setOpenmodel] = useState(false)
    const [selecteddata, setSelectedData] = useState()
    const [tableData, setTableData] = useState([])
    const [selectedValue, setSelectedValue] = useState()
    const [time, setTime] = useState(false)

    //mapping userdata
    const tempdata = usersData.length > 0 ? usersData.map((item) => {
        return {
            id: item.id,
            sn: item.sn,
            fdate: item.date,
            task: item.task,
            Estime: item.time,
            timeTaken: item.timeTaken,
            remarks: item.remarks,
            status: item.status,
            action: item.id,
            createdBy: item.createdBy,
            createdAt: item.createdAt,
        }
    }) : []

    //mapping tempdata
    const extractedData = tempdata.length > 0 ? tempdata.map(({id, sn, fdate, task,timeTaken, remarks, action, createdAt, Estime , status,createdBy}) => {
        const time = createdAt;
        const [hours, minutes] = time.split(":").map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes + Estime);
        const Totaltime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return {
            id,
            sn,
            fdate,
            task,
            timeTaken,
            remarks,
            action,
            createdAt,
            Estime,
            status,
            Totaltime,
            createdBy,
        };
 
    }) : [];

    console.log("ex:", extractedData)

    //closeand open for popup
    const closeMode = () => {
        setOpenmodel(false)
    }
    
    const openModel = () => {
        setOpenmodel(true)
    }

    useEffect(() => {
        setTableData(extractedData)
    }, [])

    useEffect(() => {
        const selecteddata = tableData.find(f => f.id === selectedValue)
        setSelectedData((p) => {
            return {
                ...p,
                selecteddata
            }
        })
    }, [selectedValue])
    console.log("selectedvalue: ", selectedValue)

    const Column = [
        {
            Header: 'sn',
            accessor: 'sn',
        },
        {
            Header: 'Date',
            accessor: 'fdate',
        },
        {
            Header: 'Task',
            accessor: 'task',
        },
        {
            Header: 'Estimated time',
            accessor: 'Estime',
        },
        {
            Header: 'Time taken',
            accessor: 'timeTaken',
        },
        {
            Header: 'Remarks',
            accessor: 'remarks',
        },
        {
            Header: 'Status',
            accessor: 'status',
        },
        {
            Header: 'Created by',
            accessor: 'createdBy',
        },
        {
            width: 90,
            Header: 'Action',
            accessor: 'id',
            Cell: ({ value }) => {
                return (
                    <>
                        <div className='items'>
                            <div className='del-icon'
                                onClick={() => {
                                    deleteTask(value);
                                }}>
                                <MdDelete size={20} />
                            </div>
                            <div className='edit-icon'>
                                <button type='button' onClick={() => {
                                    setSelectedValue(value)
                                    openModel()
                                }}> <MdOutlineDownloadDone size={20} /></button>
                            </div>
                        </div>
                    </>
                );

            },
        },
    ]
    const { getToken } = Authuser()

    //delete request
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    };

    const deleteTask = (id) => {
        const uid = parseInt(id)
        axios.delete(`http://192.168.100.135:3000/tasks/${id}`, { headers: headers })
            .then(response => {
                if (response.status === 200) {
                    tableData.filter(task => task.id === uid)
                    console.log(response, "response")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const columns = useMemo(() => Column, []);
    const data = useMemo(() => tableData, [tableData]);
    const Tableinstance = useTable({ columns, data })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = Tableinstance;

    //formik initial values
    const iniitialValues = {
        formdate: '',
        todate: '',
    }

    //filtering data
    const filterdate = () => {
        axios.get(`http://192.168.100.135:3000/tasks?fromdate=${values.fromdate}&todate=${values.todate}`, { headers: headers })
            .then(response => {
                if (response.status === 200) {
                    setTableData(response?.data?.data)
                    console.log("Response:", response?.data?.data)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    //formik
    const { values, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: iniitialValues,
        filterdate
    });


    //rendering table
    return (
        <>
            {openmodel && <Popup closeMode={closeMode} selecteddata={selecteddata} selectedValue={selectedValue} />}
                    
            <div className='d-filter'>
                <label> Filter date: </label>
                <input
                    type="date"
                    id="date"
                    name="fromdate"
                    value={values.fromdate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <label> to: </label>
                <input
                    type="date"
                    id="date"
                    name="todate"
                    value={values.todate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <button onClick={filterdate} type='button'>Search</button>
            </div>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => {
                            return (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map((columns) => {
                                            return (
                                                <th {...columns.getHeaderProps()}>
                                                    {columns.render('Header')}
                                                </th>)
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </thead >
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} style={{ backgroundColor: time ? '#b85153' : '' }}>
                                    {
                                        row.cells.map((cell) => {
                                            return (<td {...cell.getCellProps()}>{cell.render('Cell')}</td>)
                                        })
                                    }
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </>
    )
}

export default Tanstacktable

