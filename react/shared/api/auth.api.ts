import { HttpMethods } from '../services/http.service'
import { Session, User } from '../types/user.types'

export class AuthApi {
  private http: HttpMethods

  constructor(http: HttpMethods) {
    this.http = http
  }

  async getByEmail(email: string) {
    const user = await this.http.get<User[]>(`/_v/services/vtex/searchByEmail/${email}`)
    return user
  }

  async getSession() {
    const session = await this.http.get<Session>(`/api/sessions?items=cookie`)
    return session
  }
}
