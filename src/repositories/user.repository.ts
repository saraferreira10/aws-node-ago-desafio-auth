import { ResultSetHeader, RowDataPacket } from 'mysql2'
import connection from '../database/connection.database'
import { randomUUID } from 'crypto'
import UserRepositoryInterface from './interfaces/user-repository.interface'
import UserInterface from '../model/interfaces/user.interface'

export default class UserRepository implements UserRepositoryInterface {
  async save(user: UserInterface) {
    const { name, email, password } = user
    const id = randomUUID()

    const [result] = await connection.execute<ResultSetHeader>(
      'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?);',
      [id, name, email, password]
    )

    return { result, id }
  }

  async findByEmail(email: string) {
    const [result] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    return result[0] as UserInterface
  }
}
