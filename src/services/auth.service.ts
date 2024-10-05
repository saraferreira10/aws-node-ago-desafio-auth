import AuthRepositoryInterface from '../repositories/interfaces/auth-repository.interface'
import AuthServiceInterface from './interfaces/auth-service.interface'
import bcrypt from 'bcryptjs'

export default class AuthService implements AuthServiceInterface {
  constructor(private authRepository: AuthRepositoryInterface) {}

  async authenticate(email: string, password: string) {
    const user = await this.authRepository.findActiveUserByEmail(email)

    if (!user) return undefined

    const comparePasswords = await bcrypt.compare(password, user.password)

    return comparePasswords ? user : undefined
  }
}
