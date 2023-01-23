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
                    axios.delete(`https://b088-27-34-49-218.in.ngrok.io/tasks/${value}`)
                    .then(Response => console.log(Response))
                }}>
                <div className='del-icon'>
                <MdDelete size={20} />
                </div>
              </div>
            );
        }
    },
]

