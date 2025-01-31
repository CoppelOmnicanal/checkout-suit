// axiosConfig.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const axiosWrapper = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axiosWrapper.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    return request
  },
  (error: AxiosError) => {
    console.error('Request Error Interceptor:', error)
    return Promise.reject(error)
  },
)

axiosWrapper.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Response Interceptor:', response)
    return response
  },
  (error: AxiosError) => {
    console.error('Response Error Interceptor:', error)
    return Promise.reject(error)
  },
)

export { axiosWrapper }
