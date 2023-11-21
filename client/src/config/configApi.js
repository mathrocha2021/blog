import axios from 'axios';

// Define a URL base para todas as requisições feitas com esta instância
const baseURL = process.env.REACT_APP_API_URL;

// Define a URL base para todas as requisições feitas com esta instância
const api = axios.create({
    baseURL: baseURL
});

export default api;