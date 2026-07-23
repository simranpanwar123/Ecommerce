import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-backend-hut8.onrender.com/api"
}); 

export default api;