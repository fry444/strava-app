import axios from "axios";
import { properties } from "../properties.js";

const axiosClient = axios.create({
  baseURL: properties.API_URL,
});

export default axiosClient;
