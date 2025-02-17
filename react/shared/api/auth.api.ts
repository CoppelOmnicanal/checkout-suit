import { getEnvs } from '../../env.config'
import { LoginFormType } from '../components/login'
import { HttpMethods } from '../services/http.service'
import { StarProcessPayload, ValidatePayload, ValidateResponse } from '../types/auth.types'
import { Session, User } from '../types/user.types'
import { VTEXUser } from '../types/vtex-user.types'

export class AuthApi {
  private http: HttpMethods

  constructor(http: HttpMethods) {
    this.http = http
  }

  async getByEmail(email: string) {
    const user = await this.http.get<User[]>(`/_v/services/vtex/searchByEmail/${email}`)
    return user
  }

  async getByEmailVTEX(email: string) {
    const user = await this.http.get<VTEXUser>(`/api/checkout/pub/profiles?email=${email}`)
    return user
  }

  async getSession() {
    const session = await this.http.get<Session>(`/api/sessions?items=cookie`)
    return session
  }

  async logout() {
    const { account } = getEnvs()

    await this.http.get(`/api/vtexid/pub/logout?scope=${account}&returnUrl=`)
  }

  async startProcess(email: string) {
    const { account } = getEnvs()
    const url = '/api/vtexid/pub/authentication/startlogin'
    const payload: StarProcessPayload = {
      fingerprint: null,
      callbackUrl: null,
      returnUrl: null,
      accountName: account,
      scope: account,
      user: email,
    }

    await this.http.postEncoded(url, payload)
  }

  async validate(data: LoginFormType) {
    const url = '/api/vtexid/pub/authentication/classic/validate'
    const payload: ValidatePayload = {
      login: data.email,
      password: data.password,
    }

    const { authStatus } = await this.http.postEncoded<ValidateResponse, ValidatePayload>(url, payload)
    return authStatus
  }
}
