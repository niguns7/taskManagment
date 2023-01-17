import axios from 'axios';
import { MdDelete } from 'react-icons/md'
import './Column.css';


export const Column = [
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
        Cell: ({value}) => {
            return (
              <div
                className="action-content"
                onClick={() => {
                    axios.delete(`https://1b66-2400-1a00-b060-737-2e1c-f1c4-50e9-917a.in.ngrok.io/tasks/${value}`)
                }}>
                <div className='del-icon'>
                <MdDelete size={20} />
                </div>
              </div>
            );
        }
    },
]

