import CustomError from '../types/error.type'
import User from '../model/user.model'
import UserRepository from '../repositories/user.repository'
import bcrypt from 'bcryptjs'
import {
  isEmailValid,
  isPasswordValid,
  validateFields
} from '../utils/user.utils'

export default class UserService {
  constructor(private userRepository: UserRepository) {}

  async save(user: User) {
    const isUserFieldsValid = validateFields(user)

    if (!isUserFieldsValid.isValid) {
      throw new CustomError(400, isUserFieldsValid.error!)
    }

    if (!isEmailValid(user.email)) {
      throw new CustomError(400, 'email is invalid')
    }

    if (!isPasswordValid(user.password)) {
      throw new CustomError(
        400,
        'password must be at least 6 characters long with letters and numbers'
      )
    }

    const userExists = await this.userRepository.findByEmail(user.email)

    if (userExists) {
      throw new CustomError(409, 'email already registered')
    }

    user.password = await bcrypt.hash(user.password, 10)

    return await this.userRepository.save(user)
  }
}
