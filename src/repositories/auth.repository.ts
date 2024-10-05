import { RowDataPacket } from 'mysql2'
import connection from '../database/connection.database'
import AuthRepositoryInterface from './interfaces/auth-repository.interface'
import UserInterface from '../model/interfaces/user.interface'

export default class AuthRepository implements AuthRepositoryInterface {
  async findActiveUserByEmail(email: string) {
    const [result] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ? AND active = 1',
      [email]
    )

    if (!result[0] || result.length === 0) return undefined

    return result[0] as UserInterface
  }
}
