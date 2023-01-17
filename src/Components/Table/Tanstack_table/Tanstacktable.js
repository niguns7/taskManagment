import React, { useMemo} from 'react';
import { Column } from './Columns';
import { useTable } from 'react-table';
import './Tanstacktable.css';

const Tanstacktable = (props) => {

    const MockData = props.usersData.map((item) => {
        return {
            sn: item.sn,
            date: item.date,
            task: item.task,
            time: item.time,
            timeTaken: item.timeTaken,
            status: item.status,
            action: item.sn
        }
    });

    

    const columns = useMemo(() => Column, []);
    const data = useMemo(() => MockData, [MockData]);
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