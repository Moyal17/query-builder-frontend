import axios from 'axios';
import localStorage from 'local-storage';
import {toast} from 'react-toastify';

const token = localStorage.get('qb-token') || null;

const publicClient = axios.create({
  baseURL: 'http://localhost:8082'
});

const publicClientConfig = {
  headers: {
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PATCH, PUT'
  }
};

if (token) {
  publicClientConfig.headers.Authorization = token;
}

publicClient.interceptors.request.use((request) => {
  console.log('interceptors request: ', request);
  return request;
}, (error) => {
  console.log('interceptors request error: ', error.message);
  return Promise.reject(error);
});

publicClient.interceptors.response.use((response) => {
  console.log('interceptors response: ', response);
  return response.data;
}, (error) => {
  console.log('interceptors response error: ', error.message);
  console.log(`code: ${error.response.status}, data: ${error.response.data}`);
  if(error.response.data && error.response.data.message){
    toast.error(error.response.data.message, {
      closeOnClick: true,
      pauseOnHover: true
    });
  }
  return Promise.reject(error);
});

const apiMethods = {
  users: {
    checkIfLoggedIn: query => publicClient.get(`/api/users/checkIfLoggedIn`, publicClientConfig),
    register: body => publicClient.post('/public/users/register', body, publicClientConfig),
    login: body => publicClient.post('/public/users/login', body, publicClientConfig),
    logout: () => {
      localStorage.remove('qb-auth');
    },
  },
  queries: {
    getUserQueries (query) {
      const api = '/public/users/getUserQueries';
      return publicClient.get(query ? (api + query) : api, publicClientConfig);
    },
    executeQuery (query) {
      const api = '/public/queries/executeQuery';
      return publicClient.get(query ? (api + query) : api, publicClientConfig);
    },
    create (body) {
      return publicClient.post('/public/queries/createQuery', body , publicClientConfig);
    },
    update (body) {
      return publicClient.put('/public/queries/updateQuery', body , publicClientConfig);
    },
    remove (queryId) {
      return publicClient.delete(`/public/queries/removeQuery/${queryId}`, publicClientConfig);
    },
  }
};

export { apiMethods, publicClientConfig };
