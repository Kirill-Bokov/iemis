import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

console.info(`[axios] API baseURL = ${baseURL}`)

const apiClient = axios.create({
  baseURL,
})

export default apiClient
