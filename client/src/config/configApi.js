import axios from 'axios';

// Define a URL base para todas as requisições feitas com esta instância
const api = axios.create({
    baseURL: "http://localhost:3000/api"
});

export default api;