import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://api.codechef.com/',
});

api.interceptors.request.use((config) => {
  if (!Cookies.get('access_token')) {
    return axios.post('/auth/token', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        config.headers.Authorization = `Bearer ${res.data.access_token}`;
        return config;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return config;
}, (error) => {
  console.log(error);
});

api.interceptors.response.use(config => config, (error) => {
  const originalRequest = error.config;
  console.log(originalRequest);
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    // make refresh token request
    return axios.post('/auth/token', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
        api(originalRequest);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return Promise.reject(error);
});

export default api;
