import * as yup from 'yup';

const Tableschema = yup.object().shape({
    sn: yup.string().required('required'),
    date: yup.string().required('required'),
    task: yup.string().required('required'),
    time: yup.string().required('required'),
    timeTaken: yup.string().required('required'),
    status: yup.string().required('required'),
}) 

export default Tableschema;