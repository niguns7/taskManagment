import React, { useMemo, useState } from 'react';
// import { Column } from './Columns';
import { useTable } from 'react-table';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi'
import './Tanstacktable.css';
import './Column.css';

const Tanstacktable = (props) => {

    const tempdata = props.usersData.length > 0 ? props.usersData.map((item) => {
        return {
            id: item.id,
            sn: item.sn,
            date: item.date,
            task: item.task,
            time: item.time,
            timeTaken: item.timeTaken,
            status: item.status,
            action: item.id
        }
    }) : []

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
            Header: 'Status',
            accessor: 'status',
        },
        {
            width: 90,
            Header: 'Action',
            accessor: 'action',
            Cell: ({ value }) => {
                // const id = parseInt(sn)
                return (
                    <>
                    <div className='items'>
                        <div className='del-icon'
                            onClick={() => {
                                deleteTask(value);
                            }}>
                            <MdDelete size={20} />
                        </div>
                        <div className='edit-icon'
                            onClick={() => {
                                handleEdit(value);
                            }}>
                            <BiEdit size={20} />
                        </div>
                    </div>
                    </>
                );

            },
        },
    ]
const [tData, setTdata] = useState()

//delete request
const deleteTask = (id) => {
    axios.delete(`http://192.168.100.135:8000/tasks/${id}`)
        .then(response => {
            if (response.status === 200) {
                setTdata(tempdata.filter(task => task.id === id))
                console.log(response, "response")
            }
        })
        .catch(error => {
            console.log(error)
        })
}

//put request
const [editingData, setEditingData] = useState()
const handleEdit = (id) => {
    axios.put(`http://192.168.100.135:8000/tasks/${editingData.id}`).then(response => {
        if (response.status === 200) {
            setEditingData(prevData => prevData.map(data => data.id === editingData.id ? editingData : data));
            setEditingData({});
            console.log(response, 'resonse')
        }
    }).catch(error => {
        console.log(error)
    })
}

const columns = useMemo(() => Column, []);
const data = useMemo(() => tempdata, [tempdata]);
const tableInstance = useTable({ columns, data });

const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow, } = tableInstance;
return (
    <>
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