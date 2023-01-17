import * as yup from 'yup';

const Tableschema = yup.object().shape({
    sn: yup.string().email('enter a valid email').required('Required'),
    date: yup.string().required('Date'),
    task: yup.string().required('Task'),
    time: yup.string().required('Time'),
    timeTaken: yup.string().required('Time taken'),
    status: yup.string().required('Status'),
}) 

export default Tableschema;