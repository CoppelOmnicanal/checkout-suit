import { axiosWrapper as axios } from '../config/axios.config'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export class HttpMethods {
  protected url: string = ''

  constructor(url?: string) {
    this.url = url ?? ''
  }

  //@ts-ignore
  async get<T>(endpoint: string, params?: URLSearchParams): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(this.url + endpoint)
      return response.data
    } catch (error) {
      throw new Error('Unexpected Error')
    }
  }

  async post<T, K>(endpoint: string, body: K, configuration?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post(this.url + endpoint, body, configuration)
      return response.data
    } catch (error) {
      console.log("🚀 ~ HttpMethods ~ error:", error)
      throw new Error('Unexpected Error')
    }
  }

  async postEncoded<T, K>(endpoint: string, body: K): Promise<T> {
    const headers = { ...axios.defaults.headers.common, 'Content-Type': 'application/x-www-form-urlencoded' }
    const payload = new URLSearchParams(body as Record<string, any>).toString()
    return this.post<T, string>(endpoint, payload, { headers })
  }

  async put<T, K>(endpoint: string, body: K): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.put(this.url + endpoint, body)
      return response.data
    } catch (error) {
      console.log('🚀 ~ HttpMethods ~ error:', error)
      throw new Error('Unexpected Error')
    }
  }
}
