import axios from "axios";

const dbURL = "http://localhost:9000/"

export const axiosService = axios.create({
    baseURL: dbURL,
});

axiosService.interceptors.request.use((config) => {
    config.data['accessToken'] = localStorage.getItem('accessToken')
    config.data['refreshToken'] = localStorage.getItem('refreshToken')
    console.log("manipulated config: ", config)
    return config;
}, (error) => {
      return Promise.reject(error.message);
});

axiosService.interceptors.response.use((response) => {
    console.log("Perform the response mani here: ", response)
    localStorage.setItem('accessToken', response.data["accessToken"]);
    localStorage.setItem('refreshToken', response.data["refreshToken"]);
    return response;
}, (error) => {
    return Promise.reject(error.message);
});
