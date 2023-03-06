import axios from 'axios';
import localStorage from 'local-storage';

const token = localStorage.get('Aspire-auth') || null;

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
  return Promise.reject(error);
});

const apiMethods = {
  users: {
    register: body => publicClient.post('/public/users/register', body, publicClientConfig),
    login: body => publicClient.post('/public/users/login', body, publicClientConfig),
    getUserQueries (query) {
      const api = '/public/users/getUserQueries';
      return publicClient.get(query ? (api + query) : api, publicClientConfig);
    },
    logout: () => {
      localStorage.remove('qb-auth');
    },
  },
  movies: {
    getMovies (query) {
      const api = '/public/movies/getMovies';
      return publicClient.get(query ? (api + query) : api, publicClientConfig);
    },
  },
  queries: {
    executeQuery (query) {
      const api = '/public/queries/executeQuery';
      return publicClient.get(query ? (api + query) : api, publicClientConfig);
    },
    createQuery (body) {
      return publicClient.post('/public/queries/createQuery', body , publicClientConfig);
    },
    updateQuery (body) {
      return publicClient.put('/public/queries/updateQuery', body , publicClientConfig);
    },
    removeQuery (query) {
      const api = '/public/queries/removeQuery';
      return publicClient.delete(query ? (api + query) : api, publicClientConfig);
    },
  }
};

export { apiMethods, publicClientConfig };
