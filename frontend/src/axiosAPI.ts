import axios from "axios";
import {baseURL} from "./globalConstants.ts";

const axiosAPI = axios.create({
    baseURL: baseURL,
});

export default axiosAPI;