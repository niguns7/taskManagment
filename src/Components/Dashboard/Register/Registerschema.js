import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const Registerschema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  uname: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required("Please enter full name"),
  fname: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required("Please enter user name"),
  contact: yup.string().min(2, 'not a valid contact number!').max(11, 'not a valid contact number!').required("enter contact number"),
  password: yup.string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  role: yup.string().min(2).max(50).required("enter role of user"),
  designation: yup.string().min(2).max(50).required("enter designation"),


});