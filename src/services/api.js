import axios from "axios";

const api = axios.create({
  baseURL: 'http://volpix.com.br/api',
  // baseURL: 'http://192.168.56.1/VendasOnline/api'
})

export default api;