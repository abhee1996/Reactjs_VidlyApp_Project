import http from './httpServices';
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "/auth";



export function login(email,password) {
    http.post(apiEndpoint ,{
        email,
        password
    });
}