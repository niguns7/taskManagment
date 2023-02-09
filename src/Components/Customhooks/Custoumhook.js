// import axios from 'axios'
// import { useEffect, useState } from 'react';
// import Authuser from '../Forms/Authuser';

// export const useTasks=()=>{
//     const {getToken} = Authuser()
    
//     const [data,setData]=useState([]);
//     const [loading,setLoading]=useState([]);
//     const [error,setError]=useState([]);
//     const headers = { 
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${getToken()}`
//     };

//     console.log("data:",data)
//     const getTasks=()=>{
//         setLoading(true);
//         axios.get(`http://192.168.100.135:3000/tasks?fromdate=${new Date().toISOString().substring(0,10)}&todate=${new Date().toISOString().substring(0,10)}`,{ headers: headers } )
//         .then(response => {
//             setData(response?.data?.data);
//         })
//         .catch(error => {
//             console.log(error);
//         }).finally((()=>{
//             setLoading(false)
//         }),);
//     }

//     useEffect(()=>{
//         getTasks()
//     },[])

//     return{data,loading,error,getTasks}
// }