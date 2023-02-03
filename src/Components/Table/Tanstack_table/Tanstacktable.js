import axios from 'axios';
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import { MdDelete, MdOutlineDownloadDone } from 'react-icons/md';
import { useTable } from 'react-table';
import Authuser from '../../Forms/Authuser';
import Popup from '../Popup/Popup';
import './Column.css';
import './Tanstacktable.css';

const Tanstacktable = ({usersData}) => {
    const [openmodel, setOpenmodel] = useState(false)
    const [selecteddata, setSelectedData] = useState()
    const [searchdata, setSearchdata] = useState()


    const closeMode = () => {
        setOpenmodel(false)
    }

    const tempdata = usersData.length > 0 ? usersData.map((item) => {
        return {
            id: item.id,
            sn: item.sn,
            date: item.date,
            task: item.task,
            time: item.time,
            timeTaken: item.timeTaken,
            remarks: item.remarks,
            status: item.status,
            action: item.id
        }
    }) : []
    console.log(typeof(tempdata))

    const openModel = (id) => {
        setOpenmodel(true)
        const requiredData=tempdata.find(task => task.id ===id)
        setSelectedData(requiredData)   
    }


    const Column = [
        {
            Header: 'sn',
            accessor: 'sn',
        },
        {
            Header: 'Date',
            accessor: 'date',
        },
        {
            Header: 'Task',
            accessor: 'task',
        },
        {
            Header: 'Estimated time',
            accessor: 'time',
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
            accessor: 'created_by',
        },
        {
            width: 90,
            Header: 'Action',
            accessor: 'action',
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
                                    openModel(value);
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
    const [tData, setTdata] = useState()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    };

    const deleteTask = (id) => {
        const uid = parseInt(id)
        axios.delete(`http://192.168.100.135:3000/tasks/${id}`, { headers: headers })
            .then(response => {
                if (response.status === 200) {
                    setTdata(tempdata.filter(task => task.id === uid))
                    console.log(response, "response")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }


    const columns = useMemo(() => Column, []);
    const data = useMemo(() => searchdata || tempdata, [tempdata]);
    const Tableinstance = useTable({ columns, data })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = Tableinstance;


    const iniitialValues = {
        formdate: '',
        todate: '',
    }
    const filterdate = () => {
        axios.get(`http://192.168.100.135:3000/tasks?fromdate=${values.fromdate}&todate=${values.todate}`, { headers: headers })
            .then(response => {
                if (response.status === 200) {
                    setSearchdata(response?.data?.data);
                    console.log("Response:", response?.data?.data)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const { values, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: iniitialValues,
        filterdate
    });

    return (
        <>
            {openmodel && <Popup closeMode={closeMode} selecteddata={selecteddata} />}
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
                                <tr {...row.getRowProps()}>
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

