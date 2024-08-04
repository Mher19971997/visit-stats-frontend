import axios from 'axios';

const $host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
});


export { $host };
