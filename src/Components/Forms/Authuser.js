import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Authuser (){
    const navigate = useNavigate()

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

    const logout = () => {
        sessionStorage.clear()
        navigate('/')
    }


    const [token, setToken] = useState();
    const [user, setUser] = useState(getuser());

    const saveToken = (user, token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user)
        // navigate('/user')
    }
    const http = axios.create({
        baseURL: 'https://812e-2400-1a00-b060-2e1b-1f65-871-c420-698d.in.ngrok.io',
        headers: {
            "content-type" : "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    });
    
    return{
        setToken: saveToken,
        token,
        user,
        getToken,
        http,
        logout
    }
}