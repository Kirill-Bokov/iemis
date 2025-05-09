import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:4001',
})

export default apiClient
