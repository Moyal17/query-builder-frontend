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
    verifyUser (query) {
      const api = '/public/users/verifyEmail';
      return publicClient.get(query ? (api + query) : api, publicClientConfig);
    },
  },
  queries: {
    getMovies (query) {
      const api = '/public/articles/getFilteredArticles';
      return publicClient.get(query ? (api + query) : api, publicClientConfig);
    },
    searchInBlog (query) {
      const api = '/public/articles/searchInBlog';
      return publicClient.get(query ? (api + query) : api, publicClientConfig);
    },
    getBlogCategories () {
      return publicClient.get('/public/articles/getBlogCategories', publicClientConfig);
    },
    getArticle (uri) {
      return publicClient.get(`/public/articles/getArticleDetails/${uri}`, publicClientConfig);
    },
    getArticlesByTrainer (id) {
      return publicClient.get(`/public/articles/getArticlesByTrainer/${id}`, publicClientConfig);
    },
    getArticlesForTrainerProfile (id) {
      return publicClient.get(`/public/articles/getArticlesForTrainerProfile/${id}`, publicClientConfig);
    },
    getArticlesByCategory (uri) {
      return publicClient.get(`/public/articles/getArticlesByCategory/${uri}`, publicClientConfig);
    }
  }
};

export { apiMethods, publicClient, publicClientConfig };
