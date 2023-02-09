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
    const [searchedData, setSearcheddata] = useState()
    const [tableData, setTableData] = useState([])
    const [selectedValue, setSelectedValue] = useState()

    //mapping userdata
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
            action: item.id,
            createdBy: item.createdBy,
            createdAt: item.createdAt,
        }
    }) : []
    //mapping tempdata
    const extractedData = tempdata.length > 0 ? tempdata.map(({ id, sn, date, task, timeTaken, remarks, action, createdAt, time, status, createdBy }) => {

        const arr = new Date(createdAt).toLocaleString()
        console.log("Arr:" , arr)

        console.log(time)
        let startintTime = new Date(createdAt);
        startintTime.setMinutes(startintTime.getMinutes() + time);
        const Finaltime = startintTime.toLocaleString()
        console.log("Final :",Finaltime , typeof(Finaltime));

        return {
            id,
            sn,
            date,
            task,
            timeTaken,
            remarks,
            action,
            createdAt,
            time,
            status,
            Finaltime,
            createdBy,
        };

    }) : [];

    console.log(typeof (extractedData))


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
        if(selectedValue > 0) {
        const selecteddata = tableData.find(f => f.id === selectedValue)
        setSelectedData((p) => {
            return {
                ...p,
                selecteddata
            }
        });
        openModel();
    }
    }, [selectedValue])

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
            accessor: 'createdBy',
        },
        {
            width: 90,
            Header: 'Action',
            accessor: 'id',
            Cell: ({ value }) => {
                if (searchedData && searchedData.length > 0) {
                    console.log("searchedData", searchedData);
                    return <h3>hey</h3>
                   
                } else {
                    
                    console.log("hds",tableData)    
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
                                        
                                    }}> <MdOutlineDownloadDone size={20} /></button>
                                </div>
                            </div>
                        </>
                    );
                }

            },
        },
    ]
    const { getToken, http } = Authuser()

    //delete request
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    };

    const deleteTask = (id) => {
        const uid = parseInt(id)
        http.delete(`/tasks/${id}`, { headers: headers })
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
    const data = useMemo(() => searchedData || tableData, [tableData, searchedData]);
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
        http.get(`/tasks?fromdate=${values.fromdate}&todate=${values.todate}`, { headers: headers })
            .then(response => {
                if (response.status === 200) {
                    setSearcheddata(response?.data?.data)
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
                            const currenttime = new Date().toLocaleString()
                            const finaltime = (row.original.Finaltime)
                            const showColor = () => {
                                if (currenttime > finaltime && row.original.status !== 'done') {
                                    return true
                                } else {
                                    return false
                                }
                            }
                            console.log("currenttime: ", currenttime, "finaltime: ", finaltime)
                            console.log(showColor())
                            return (
                                <tr {...row.getRowProps()} style={{ backgroundColor: showColor() ? '#F88379' : '' }}>
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

