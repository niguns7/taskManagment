import * as yup from "yup";

export const Signupschema = yup.object({
    email: yup.string().email().required("Please enter a valid email"),
    password: yup.string().required("enter a valid password provided by admin"),
    confirmpassword: yup.string().oneOf([yup.ref("passsword")], null).required("password must match"),
})

    // //await new Promise((resolve) => setTimeout(resolve,1000) )
    // const findUser = ValidData.find((val) => val.email === values.email)
    // if (!findUser) {
    //   return alert("User not found")
    // }
    // if (findUser.pass !==  values.password) {
      //   return alert('Password incorrect')
      // }
      // if (findUser.role === 'Admin') {
      //   navigate('/admin')
      // }
      // else {
      //   navigate('/user')
    // }