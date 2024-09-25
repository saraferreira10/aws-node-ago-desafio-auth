import User from '../model/user.model'
import UserRepository from '../repositories/user.repository'

export default class UserService {
  constructor(private userRepository: UserRepository) {}

  async save(user: User) {
    return await this.userRepository.save(user)
  }
}
