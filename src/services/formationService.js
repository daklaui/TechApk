import { API } from '../configs/constant';
const axios = require("axios").default;

const listeDesFormation = API + '/ListedesFormations';
const getFormationWithId = API + '/getFormationById';
const urlGetSessionByIdFormation = API + '/getSessionByIdFormation';
const urlGetListPlaningBySession = API + '/ListPlaningBySession';
const searchFormationByTitre = API + '/getFormationByTitres';
const inscriptionUrl = API + '/InscriptionEtudiant';
const urlSessionByDay = API + '/ListPlaningByDay';
export const getAllFormations = () => {
    return axios.get(listeDesFormation);
}
export const getListPlaningBySession = (id) => {
    return axios.get(urlGetListPlaningBySession+"/"+id);
}
export const searchFormation = (titre) => {
    return axios.get(searchFormationByTitre+"/"+titre);
}

export const getFormationById = (id) => {
    return axios.get(getFormationWithId + "/" +id);
}
export const getSessionByIdFormation = (id) => {
    return axios.get(urlGetSessionByIdFormation + "/" +id);
}
export const inscription = (idSession,idEtudiant,) => {
    return axios.put(inscriptionUrl +"/"+idSession+"/"+idEtudiant,{});
}
export const getSessionByDay = (date,idFormateur,) => {
    return axios.get(urlSessionByDay +"/"+date+"/"+idFormateur);
}