import axios from 'axios';

// const baseURL = process.env.REACT_APP_API_BASE_URL; CRA approach
const baseURL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;
