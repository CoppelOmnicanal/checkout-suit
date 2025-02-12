// axiosConfig.ts
import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'

const axiosWrapper = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axiosWrapper.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`
    }
    return request
  },
  (error: AxiosError) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  },
)

axiosWrapper.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error('Response Error:', error.response.data)
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Axios Setup Error:', error.message)
    }
    return Promise.reject(error)
  },
)

export { axiosWrapper }
