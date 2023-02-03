import * as yup from 'yup';
import Authuser from './Authuser';

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const Basicschemas = yup.object().shape({
    // email: yup.string().email('enter a valid email').required('Required'),
    username: yup.string().required('Required'),
    password: yup
        .string()
        // .matches(passwordRules, { message: 'please enter a valid password provided by admin' })
        .required('Required'),
}) 

export default Basicschemas;