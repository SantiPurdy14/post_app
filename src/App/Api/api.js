import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-18-223-143-226.us-east-2.compute.amazonaws.com/'
});

api.interceptors.request.use(
  async (config) => {
    try {
        config.headers['app-id'] = `6168e7aad4e9b572ba9ec413` ;
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;