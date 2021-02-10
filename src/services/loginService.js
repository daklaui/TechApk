import {API} from '../configs/constant';
const axios = require("axios").default;

const loginUrl=API+'/login';
export const  login=(email,password,deviceId)=>{
    return axios.get(loginUrl+"/"+email+"/"+password+"/"+deviceId);
   }
