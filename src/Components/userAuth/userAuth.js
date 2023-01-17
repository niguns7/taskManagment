import * as yup from 'yup'

const passwordrule = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;

let schema = yup.object().shape({
    email: yup.string().email('please enter a valid email'),
    password: yup.string().min(5).matches(passwordrule, { message: 'enter a stronger password' }).required('required'),
});