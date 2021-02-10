import { API } from '../configs/constant';
const axios = require("axios").default;

const listFormationByFormateur = API + '/getListFormation';
const listSessionFormateur = API + '/getListSessionById';
const getEtudiantWithEmail = API + '/getEtudiantByEmail';
const updatePassword = API + '/UpdatePasswordFormateur';
const urlUpdateFormateur = API + '/UpdateFormateur';
const getFormationByIdEtudiant = API + '/getSessionByIdEtudiant';
const urlUploadImage = API + '/api/upload';
const urlDownloadImage = API + '/image';
const urlGetListEtudiantBySession = API + '/getListEtudiantBySession';
const urlListPlaningBySession = API + '/ListPlaningBySession';
export const getFormations = (id) => {
    return axios.get(listFormationByFormateur + "/" +id);
}

export const getListSession = (id,id2) => {
    return axios.get(listSessionFormateur + "/" +id+"/"+id2);
}

export const updateFormateur = (formateur, id) => {
    return axios.put(urlUpdateFormateur + "/" + id, formateur);
}
export const updatePasswordFormateur = (passwordObject, id) => {
    return axios.put(updatePassword + "/" + id, passwordObject);
}
export const getListEtudiantBySession = (id) => {
    return axios.get(urlGetListEtudiantBySession + "/" +id);
}

export const getListPlaningBySession = (id) => {
    return axios.get(urlListPlaningBySession + "/" +id);
}
