import axios from "axios";
// 상황따라 주소 다름
<<<<<<< HEAD
const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
// const PROD_BACKEND = process.env.REACT_APP_PROD_BACKEND;
// const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;

const api = axios.create({
  baseURL: `${LOCAL_BACKEND}/api`,
//   baseURL: `${BACKEND_PROXY}/api`,
=======
// const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
const PROD_BACKEND = process.env.REACT_APP_PROD_BACKEND;
// const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;

const api = axios.create({
//   baseURL: `${LOCAL_BACKEND}/api`,
  baseURL: `${PROD_BACKEND}/api`,
>>>>>>> b5317968d4dc3444973f63569863962040e071ad
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  },
  function (error) {
    console.log('REQUEST ERROR', error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response ? error.response.data : { message: 'Unknown error' };
    console.log('RESPONSE ERROR', error);
    return Promise.reject(error);
  },
);

export default api;
