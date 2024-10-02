import { ResultSetHeader, RowDataPacket } from 'mysql2'
import connection from '../database/connection.database'
import User from '../model/user.model'
import { randomUUID } from 'crypto'
import bcrypt from 'bcryptjs'

export default class UserRepository {
  constructor() {}

  async save(user: User) {
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

    return result[0]
  }

  async authenticateUser(email: string, password: string) {
    const [result] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    if (result.length > 0)
      return await bcrypt.compare(password, result[0].password)

    return false
  }
}
