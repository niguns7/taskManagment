import { useFormik } from 'formik';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useTable } from 'react-table';
import Authuser from '../../Forms/Authuser';
import AssignTask from './AssignTask/AssignTask';
import { Column } from './Column';
import './Tasks.css';
import { TaskContext } from '../../contextprovider/Context';


const Tasks = () => {
  const { initialyear } = useContext(TaskContext)
  const { initialmonth } = useContext(TaskContext)

  console.log(initialyear, initialmonth)

  const isSelected = initialmonth && initialyear ? true : false;
  console.log(isSelected);


  const sn = useParams()
  const id = (sn?.sn)

  const { http } = Authuser()
  const [userdata, setUserdata] = useState([])

  const year = parseInt(initialyear);
  const month = parseInt(initialmonth);

  const fromDate = new Date(year, month - 1, 1,  23, 59, 59, 999);
  const toDate = new Date(year, month, 0, 23, 59, 59, 999);

  console.log("fromdate", fromDate)
  console.log("todate", toDate)

  const fromDateStr = isSelected? fromDate.toISOString().substring(0, 10): new Date().toISOString().substring(0, 10) ;
  const toDateStr = isSelected? toDate.toISOString().substring(0, 10):new Date().toISOString().substring(0, 10) ;


  // console.log("fromdate", fromDateStr)
  // console.log("todate", toDateStr)

    const fetchdata = async () => {
      const res = await http.get(`/tasks/admin/user/${id}?fromdate=${fromDateStr}&todate=${toDateStr}`)
      return res?.data
    }

  const { data: tabdata } = useQuery("tabdata", () => fetchdata())


  useEffect(() => {
    if (tabdata?.data?.length > 0) {
      console.log("ssk", tabdata?.data)
      setUserdata(tabdata?.data)
    }
  }, [tabdata])

  useEffect(() => {
    const taskdata = userdata.length > 0 ? userdata.map((items) => {
      return {
        sn: items.sn,
        date: items.date,
        task: items.task,
        status: items.status,
      }
    }) : []
  }, [userdata])

  //filtering tasks according to date
  const [searchdata, setSearchdata] = useState()

  const filterdate = () => {
    http.get(`/tasks/admin/user/${id}?fromdate=${values.fromdate}&todate=${values.todate}`)
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
  const data = useMemo(() => searchdata || userdata, [userdata, searchdata]);
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
      {
      isSelected ?
      <div className='taskfil'>
        <h9> Task of  <b>{year} , {month}</b></h9> 
      </div> : 

      <>
      <AssignTask id={id}/>
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
    
      </>
      
    }
      <div className='mainpage'>
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