import React, { useEffect, useMemo, useState } from 'react';
import './Viewusers.css';
// import { Column } from './Columns';
import { useTable } from 'react-table';
import axios from 'axios';
import { MdDelete ,MdOutlineDownloadDone} from 'react-icons/md';
import Authuser from '../Forms/Authuser';
import Upopup from './usepopup/Upopup';

const Viewusers = () => {
    const{http} = Authuser()
    //get request
    const [userdata, setUserdata] = useState([])
    const [openmodel, setOpenmodel] = useState(false)
    const [selecteddata, setSelectedData] = useState()
    const [selectedValue, setSelectedValue] = useState()

        const closeMode = () => {
        setOpenmodel(false)
    }

    const openModel = () => {
        setOpenmodel(true)
    }

    useEffect(() => {
        const selecteddata = userdata.find(f => f.id === selectedValue)
        setSelectedData((p) => {
            return {
                ...p,
                selecteddata
            }
        })
    }, [selectedValue])

    useEffect(() => {

        http.get('/users/alluser')
            .then(response => {
                setUserdata(response?.data?.data)
                console.log("data", response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const tempData = userdata.length > 0 ? userdata.map((items) => {
            return {
                id: items.id,
                username: items.username,
                fullname: items.fullname,
                email: items.email,
                password: items.password,
                contactNo: items.contactNo,
                roles: items.roles,
                designation: items.designation,
                action: items.id
            }
        }) : []

        console.log("tempData", tempData)


    const Column = [
        {
            Header: 'Id',
            accessor: 'id'
        },
        {
            Header: 'Fullname',
            accessor: 'fullname',
        },
        {
            Header: 'Username',
            accessor: 'username',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Password',
            accessor: 'password',
        },
        {
            Header: 'Contact no',
            accessor: 'contactNo',
        },
        {
            Header: 'Role',
            accessor: 'roles',
        },
        {
            Header: 'Designation',
            accessor: 'designation',
        },
        {
            width: 90,
            Header: 'Action',
            accessor: 'action',
            Cell: ({ value }) => {
                return (
                            <div className='items'>
                                <div className='del-icon'
                                    onClick={() => {
                                        deleteUser(value);
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
                );
            }
        },
    ]

    const [deleteuser, setDeleteuser] = useState()

    const deleteUser = (id) => {
        const uid = parseInt(id)
        http.delete(`http://192.168.100.135:3000/users/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setDeleteuser(userdata.filter(task => task.id === uid))
                    console.log(response, "response")
                }
            })
            .catch(error => {
                console.log(error)
            })
            alert("Deleted user")
    }


    const columns = useMemo(() => Column, []);
    const data = useMemo(() => tempData, [tempData]);
    const tableInstance = useTable({ columns, data });


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow, } = tableInstance;


    return (
        <>
                    {openmodel && <Upopup closeMode={closeMode} selecteddata={selecteddata} selectedValue={selectedValue}   />}
            <div className='mainpage'>
                <h1 className='heading'> List of users </h1>
                <div className='Container'>
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
                </div>
            </div>
        </>
    )
}

export default Viewusers;