import axios from 'axios';
import defaultConfig from './defaultConfig';
import { EnvironmentService } from './environmentService';
import Cookie from 'js-cookie';

const envService = new EnvironmentService();
const instance = axios.create({
  baseURL: envService.getBaseURL(),
  timeout: 50000,
  headers: { 'Content-Type': 'multipart/form-data' },
});
const jsonInstance = axios.create({
  baseURL: envService.getBaseURL(),
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});
const fileInstance = axios.create({
  baseURL: envService.getBaseURL(),
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'blob',
});
const newInstance = axios.create({
  baseURL: envService.getBaseURL(),
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});

export default class APIService {
  config = { ...defaultConfig };
  isAlreadyFetchingAccessToken = false;
  subscribers = [];
  constructor(overrideConfig) {
    this.config = { ...this.config, ...overrideConfig };
    instance.interceptors.request.use(
      (config) => {
        let accessToken;
        if (this.getToken()) {
          accessToken = this.getToken();
        }
        if (accessToken) {
          config.headers.Authorization = `${this.config.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    jsonInstance.interceptors.request.use(
      (config) => {
        let accessToken;
        if (this.getToken()) {
          accessToken = this.getToken();
        }
        if (accessToken) {
          config.headers.Authorization = `${this.config.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    fileInstance.interceptors.request.use(
      (config) => {
        let accessToken;
        if (this.getToken()) {
          accessToken = this.getToken();
        }
        if (accessToken) {
          config.headers.Authorization = `${this.config.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;

        if (response && response.status === 401) {
          window.location.href = '/';
          localStorage.removeItem('persist:root');
          Cookie?.remove('token');
          Cookie?.remove('userType');
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
        return Promise.reject(error);
      }
    );
    jsonInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;

        if (response && response.status === 401) {
          window.location.href = '/';
          localStorage.removeItem('persist:root');
          Cookie?.remove('token');
          Cookie?.remove('userType');
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
        return Promise.reject(error);
      }
    );
    fileInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;

        if (response && response.status === 401) {
          window.location.href = '/';
          localStorage.removeItem('persist:root');
          Cookie?.remove('token');
          Cookie?.remove('userType');
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
        return Promise.reject(error);
      }
    );
  }
  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    );
  }
  getToken() {
    return JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.auth)
      ?.userData?.token;
  }
  getRefreshToken() {
    return localStorage.getItem(this.config.storageRefreshTokenKeyName);
  }
  setToken(value) {
    const token = localStorage.getItem('persist:root');
    const parsedToken = JSON.parse(token);
    const parsedAuth = JSON.parse(parsedToken?.auth);
    const newParsed = {
      ...parsedAuth,
      userData: {
        ...parsedAuth.userData,
        token: value,
      },
    };
    console.log({ token, parsedToken, parsedAuth, newParsed });
    // localStorage.setItem('persist:root', JSON.stringify(newParsed))
    // const auth = JSON.parse(JSON.parse(token).auth)
    // auth.userData.token = value
    // const newToken =
    //   console.log({ value, token, token1: JSON.parse(JSON.parse(token).auth), auth: auth })
    // localStorage.setItem(this.config.storageTokenKeyName, value);
  }
  setRefreshToken(value) {
    localStorage.setItem(this.config.storageRefreshTokenKeyName, value);
  }
  async login(args) {
    // console.log({ args });
    return await newInstance.post(this.config.loginEndpoint, args);
  }
  async getData(url, params) {
    // this.resetHeaders();
    return await instance.get(url, params);
  }
  async getSingleData(url, params) {
    // this.resetHeaders();
    return await instance.get(url, params);
  }
  async postData(url, data) {
    return await instance.post(url, data);
  }
  async postJSONData(url, data) {
    return await jsonInstance.post(url, data);
  }
  async updateData(url, data) {
    // this.resetHeaders();
    return await instance.patch(url, data);
  }
  async updateJSONData(url, data) {
    // this.resetHeaders();
    return await jsonInstance.patch(url, data);
  }
  async patchData(url) {
    // this.resetHeaders();
    return await instance.patch(url);
  }
  async daleteData(url) {
    // this.resetHeaders();
    return await instance.delete(url);
  }
  async uploadFile(url, data) {
    this.updateHeadersForFormData();
    return await instance.post(url, data);
  }
  async downloadFile(url) {
    return await fileInstance.get(url);
  }
  updateHeadersForFormData() {
    instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  }
  resetHeaders() {
    if (
      instance.defaults.headers.common['Content-Type'] !== 'application/json'
    ) {
      instance.defaults.headers.common['Content-Type'] = 'application/json';
    }
  }
}

// import axios from 'axios';
// import defaultConfig from './defaultConfig';
// import { EnvironmentService } from './environmentService';
// import Cookie from 'js-cookie';

// const envService = new EnvironmentService();

// const createAxiosInstance = (contentType) => {
//   return axios.create({
//     baseURL: envService.getBaseURL(),
//     timeout: 50000,
//     headers: { 'Content-Type': contentType },
//   });
// };

// const instance = createAxiosInstance('multipart/form-data');
// const jsonInstance = createAxiosInstance('application/json');
// const fileInstance = createAxiosInstance('application/json');
// fileInstance.defaults.responseType = 'blob'; // Set response type for file instance

// const handleRequestInterceptors = (axiosInstance) => {
//   axiosInstance.interceptors.request.use(
//     (config) => {
//       const accessToken = getToken();
//       if (accessToken) {
//         config.headers.Authorization = `${defaultConfig.tokenType} ${accessToken}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );
// };

// const handleResponseInterceptors = (axiosInstance) => {
//   axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       const { response } = error;

//       if (response && response.status === 401) {
//         handleUnauthorizedError();
//       }
//       return Promise.reject(error);
//     }
//   );
// };

// const handleUnauthorizedError = () => {
//   window.location.href = '/';
//   localStorage.removeItem('persist:root');
//   Cookie?.remove('token');
//   Cookie?.remove('userType');
// };

// const getToken = () => {
//   const authData = JSON.parse(
//     JSON.parse(localStorage.getItem('persist:root'))?.auth
//   );
//   return authData?.userData?.token;
// };

// export default class APIService {
//   constructor(overrideConfig) {
//     this.config = { ...defaultConfig, ...overrideConfig };
//     handleRequestInterceptors(instance);
//     handleRequestInterceptors(jsonInstance);
//     handleRequestInterceptors(fileInstance);

//     handleResponseInterceptors(instance);
//     handleResponseInterceptors(jsonInstance);
//     handleResponseInterceptors(fileInstance);
//   }

//   // Token handling methods
//   getToken() {
//     return getToken();
//   }

//   setToken(value) {
//     // Implement your token setting logic here
//   }

//   // API methods
//   async login(args) {
//     return await instance.post(this.config.loginEndpoint, args);
//   }

//   async getData(url, params) {
//     return await instance.get(url, { params });
//   }

//   async postData(url, data) {
//     return await instance.post(url, data);
//   }

//   async postJSONData(url, data) {
//     return await jsonInstance.post(url, data);
//   }

//   async updateData(url, data) {
//     return await instance.patch(url, data);
//   }

//   async updateJSONData(url, data) {
//     return await jsonInstance.patch(url, data);
//   }

//   async patchData(url) {
//     return await instance.patch(url);
//   }

//   async deleteData(url) {
//     return await instance.delete(url);
//   }

//   async uploadFile(url, data) {
//     return await instance.post(url, data);
//   }

//   async downloadFile(url) {
//     return await fileInstance.get(url);
//   }
// }
