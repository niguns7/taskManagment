import React, {useMemo} from 'react';
import './Viewusers.css';
import Userdata from './Userdata.json';
import { Column } from './Columns';
import { useTable } from 'react-table';

const Viewusers = () => {

    const columns = useMemo(() => Column,[]);
    const data = useMemo(() => Userdata, []);
    const tableInstance = useTable({columns,data});


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

export default Viewusers;