import { API } from '../configs/constant';
const axios = require("axios").default;
const UrlAddMessage=API+"/AjouterMessage";
const UrlGetMessage=API+"/ListMessagesBySession";
const UrlGetName=API+"/getNameById";

export const addMessage = (message) => {
    return axios.post(UrlAddMessage, message);
}
export const getMessages = (idSession) => {
    return axios.get(UrlGetMessage + "/" +idSession);
}
export const getName = (id) => {
    return axios.get(getNameById + "/" +id);
}