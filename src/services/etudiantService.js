import { API } from '../configs/constant';
const axios = require("axios").default;

const addEtudiantUrl = API + '/AjoutEtudiant';
const updateEtudiantUrl = API + '/UpdateEtudiant';
const getEtudiantWithEmail = API + '/getEtudiantByEmail';
const updatePassword = API + '/UpdatePassword';
const getFormationByIdEtudiant = API + '/getSessionByIdEtudiant';
const urlUploadImage = API + '/api/upload';
const urlDownloadImage = API + '/image';
const urlGetSessionsByDateAndIdEtudiant = API + '/getSessionsByDateAndIdEtudiant';
export const addEtudiant = (etudiant) => {
    return axios.post(addEtudiantUrl, etudiant);
}
export const updateEtudiant = (etudiant, id) => {
    return axios.put(updateEtudiantUrl + "/" + id, etudiant);
}
export const updatePasswordEtudiant = (passwordObject, id) => {
    return axios.put(updatePassword + "/" + id, passwordObject);
}
export const getEtudiantByEmail = (email) => {
    return axios.get(getEtudiantWithEmail + "/" +email);
}

export const getFormationsByIdEtudiant = (id) => {
    return axios.get(getFormationByIdEtudiant + "/" +id);
}



export const getSessionsByDateAndIdEtudiant = (id,date) => {
    return axios.get(urlGetSessionsByDateAndIdEtudiant + "/" +id+"/"+date);
}


export const uploadImages = (image,id) => {
    return axios.put(urlUploadImage+"/"+id,image,{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    });
}

export const DownloadImages = (image) => {
    return axios.get(urlDownloadImage+"/"+image)
}


