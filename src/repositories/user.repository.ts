import { ResultSetHeader } from 'mysql2'
import connection from '../database/connection.database'
import User from '../model/user.model'

export default class UserRepository {
  async save(user: User) {
    const { name, email, password } = user

    return await connection.execute<ResultSetHeader>(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?);',
      [name, email, password]
    )
  }
}
