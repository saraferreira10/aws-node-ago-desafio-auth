import User from '../model/user.model'
import connection from '../database/connection.database'

export default class UserRepository {
  static async save(user: User) {
    const { name, email, password, active } = user

    await connection.execute(
      'INSERT INTO users (name, email, password, active) VALUES (?, ?, ?, ?);',
      [name, email, password, active]
    )
  }
}
