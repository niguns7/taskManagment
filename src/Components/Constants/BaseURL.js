// export const BASE_URL = 'http://192.168.100.135:3000'
import axios from "axios";
import Authuser from "../Forms/Authuser";

const BaseURL = () => {
    const {getToken} = Authuser()

    const http = axios.create({
        BaseURL: 'http://192.168.100.135:3000',
        headers: {
            "content-type" : "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    });

    console.log(http)
    

  return {
    http
  }

}

export default BaseURL