import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {

    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        toast.error("An unexpected error occurred.");
    }

    return Promise.reject(error);
});

 async function setToken(iToken) {
      axios.defaults.headers.common["Authorization"] = "Bearer "+iToken ;
}
// eslint-disable-next-line
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setToken
};