import axios from "axios";
import { toast } from "react-toastify";
import firebase from '../firebase'

axios.interceptors.response.use(null, error => {

    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        toast.error("An unexpected error occurrred.");
    }

    return Promise.reject(error);
});

 async function setToken() {
    await firebase.getCurrentUserObject().getIdToken()
         .then((token) => {
            console.log(token)
            axios.defaults.headers.common["Authorization"] = "Bearer "+token ;
         })
         .catch(er => console.log(er))
}
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setToken
};