import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "http://localhost:1337/api",
    timeout: 1000
})

export default AxiosInstance;