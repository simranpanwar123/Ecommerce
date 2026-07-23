import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-backend.onrender.com/api",
  
}); 

export default api;