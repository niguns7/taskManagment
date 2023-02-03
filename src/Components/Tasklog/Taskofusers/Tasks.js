import React, { useEffect, useMemo, useState } from 'react';
import './Tasks.css';
import { useTable } from 'react-table';
import { Column } from './Column';
import axios from 'axios';
import Authuser from '../../Forms/Authuser';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import AssignTask from './AssignTask/AssignTask';

const Tasks = () => {
  const sn = useParams()
  const id = Object.values(sn)

  const { getToken } = Authuser()
  const [userdata, setUserdata] = useState([])

  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${getToken()}`
  }

  // getting tasks
  useEffect(() => {
     axios.get(`http://192.168.100.135:3000/tasks/admin/user/${id}?fromdate=${new Date().toISOString().substring(0, 10)}&todate=${new Date().toISOString().substring(0, 10)}`, { headers: headers })
      .then(Response => {
        setUserdata(Response?.data?.data)
        console.log("data", Response?.data?.data)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    const taskdata = userdata.length > 0 ? userdata.map((items) => {
      return {
        sn: items.sn,
        date: items.date,
        task: items.task,
        status: items.status,
      }
    }) : []
    console.log('taskdata: ', taskdata)

  }, [userdata])

  //filtering tasks according to date
  const [searchdata, setSearchdata] = useState()

  const filterdate = () => {
     axios.get(`http://192.168.100.135:3000/tasks/admin/user/${id}?fromdate=${values.fromdate}&todate=${values.todate}`, { headers: headers })
      .then(response => {
        if (response.status === 200) {
          setSearchdata(response?.data?.data)
          console.log("Response: ", response?.data?.data)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

 

  const columns = useMemo(() => Column, []);
  const data = useMemo(() => searchdata || userdata, [userdata]);
  const tableInstance = useTable({ columns, data });


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow, } = tableInstance;

  const iniitialValues = {
    formdate: '',
    todate: '', 
    sn: '',
    date: '',
    task: '',
    time: '',
  }
  const { values, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: iniitialValues,
    filterdate,
  });


  return (
    <>
    <AssignTask userid={id}/>
      <div className='mainpage'>
        <div className='d-filter' onSubmit={handleSubmit}>
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


export default Tasks