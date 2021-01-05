import axios from 'axios';

const fatSecret = axios.create({
  baseURL: 'https://platform.fatsecret.com/rest/server.api',
});

export default fatSecret;
