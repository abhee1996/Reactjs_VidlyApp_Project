import http from './httpServices';
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
    http.post(apiEndpoint ,{
        email: user.username,
        password: user.password,
        name: user.name
    });
}


export function login(email,password) {
    http.post(apiEndpoint ,{
        email,
        password
    });
}