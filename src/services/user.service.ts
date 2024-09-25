import CustomError from '../types/error.type'
import User from '../model/user.model'
import UserRepository from '../repositories/user.repository'

export default class UserService {
  constructor(private userRepository: UserRepository) {}

  async save(user: User) {
    const userExists = await this.userRepository.findByEmail(user.email)

    if (userExists) {
      throw new CustomError(409, 'email already registered')
    }

    return await this.userRepository.save(user)
  }
}
