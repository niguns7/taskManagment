import axios from "axios";
import { useState } from "react";


export default function Authuser (){

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token')
        if(tokenString !== undefined && tokenString !== "") {
        const userToken =  JSON.parse(tokenString)
        return userToken
        }
        else {
            return;
        }
    }

    const getuser = () => {
        const userString = sessionStorage.getItem('user')
        const uesr_details =  JSON.parse(userString)
        return uesr_details
    }

    const [token, setToken] = useState();
    const [user, setUser] = useState(getuser());

    const saveToken = (user, token) => {

        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user)
    }
    const http = axios.create({
        // baseURL: 'http://139.59.64.228:3006/',
        baseURL: 'http://192.168.100.135:3000',
        headers: {
            "content-type" : "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    });

    console.log(token)
    
    return{
        saveToken,
        token,
        user,
        getToken,
        http,
    }
}