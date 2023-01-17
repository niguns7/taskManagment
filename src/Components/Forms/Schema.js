import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const Basicschemas = yup.object().shape({
    email: yup.string().email('enter a valid email').required('Required'),
    password: yup
        .string()
        .matches(passwordRules, { message: 'please enter a valid password provided by admin' })
        .required('Required'),
    confirmpassword: yup.string().oneOf([yup.ref('password'), null] ,'password most matches').required('Requireds')
}) 

export default Basicschemas;