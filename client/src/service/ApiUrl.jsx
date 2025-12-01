import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

console.log("VITE_APP_API_URL", API_BASE_URL); 

export default axios.create({
  baseURL: API_BASE_URL,
});