import React, { useMemo } from 'react';
import './Tasks.css';
import { useTable } from 'react-table';
import { Column } from './Column';

const Tasks = () => {
  const Userdata = [
    {
      "sn": 1,
      "tasks": "creating a react table",
      "status": "done",
    },
    {
      "sn": 2,
      "tasks": "fixing error of task table",
      "status": "Hold",
    },
    {
      "sn": 3,
      "tasks": "validation using formik",
      "status": "on process",
    },
    {
      "sn": 4,
      "tasks": "fetching data from api",
      "status": "carried over",
    },
  ]

  const columns = useMemo(() => Column, []);
  const data = useMemo(() => Userdata, []);
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