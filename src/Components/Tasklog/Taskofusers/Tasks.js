import React, { useEffect, useMemo, useState } from 'react';
import './Tasks.css';
import { useTable } from 'react-table';
import { Column } from './Column';
import axios from 'axios';

const Tasks = () => {
  const [userdata, setUserdata] = useState([])

  useEffect(() => {
    axios.get('http://192.168.100.135:8000/tasks')
      .then(Response => {
          setUserdata(Response?.data?.data)
          console.log("data", Response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  useEffect(()=>{
  const taskdata =userdata.length > 0 ? userdata.map((items) => {
    return {
      sn: items.sn,
      date: items.date,
      task: items.task,
      status: items.status,
    }
  }) : []
  console.log('Tempdata', taskdata)

}, [userdata])


  const columns = useMemo(() => Column, []);
  const data = useMemo(() => userdata, [userdata]);
  const tableInstance = useTable({ columns, data });


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow, } = tableInstance;


  return (
    <>
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


export default Tasks