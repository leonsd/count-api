import axios from 'axios';

console.info('process.env', process.env);
export const client = axios.create({
  baseURL: process.env.COUNT_API_BASE_URL
});
