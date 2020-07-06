

import axios from 'axios';
import {toast} from "react-toastify";

axios.interceptors.response.use(null,error=>{
   //  console.log("INTERPRETOR ");
   const errorExpected =error.responce && error.responce.status >= 400 &&
                           error.responce.status < 500;
   if(!errorExpected){
   console.log('Logging the error', error)
   toast.error("An unexpected error occurred")
   };
    return Promise.reject(error);

});

export default {
    get: axios.get ,
    put: axios.put,
    post: axios.post,
    delete: axios.delete
};