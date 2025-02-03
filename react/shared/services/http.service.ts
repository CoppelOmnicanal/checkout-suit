import { axiosWrapper as axios } from '../config/axios.config'
import { AxiosResponse } from 'axios'

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

  async post<T, K>(endpoint: string, body: K): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post(this.url + endpoint, body)
      return response.data
    } catch (error) {
      throw new Error('Unexpected Error')
    }
  }

  async put<T, K>(endpoint: string, body: K): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.put(this.url + endpoint, body)
      return response.data
    } catch (error) {
      console.log("🚀 ~ HttpMethods ~ error:", error)
      throw new Error('Unexpected Error')
    }
  }
}
