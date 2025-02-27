import axios from "axios";

const apiUrl = "http://localhost:5000"; // Recordar escribir la URL de nuestro backend

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
