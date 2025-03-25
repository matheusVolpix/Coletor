import axios from "axios";

const api = axios.create({
  baseURL: 'http://volpix.com.br/api',
  // baseURL: 'localhost/VendasOnline/api'
})

export default api;