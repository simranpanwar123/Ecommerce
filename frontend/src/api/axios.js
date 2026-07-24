import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-c19q.onrender.com/api",
})

export default api;