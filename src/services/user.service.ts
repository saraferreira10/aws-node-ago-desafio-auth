import CustomError from '../types/error.type'
import User from '../model/user.model'
import bcrypt from 'bcryptjs'
import {
  isEmailValid,
  isPasswordValid,
  validateFields
} from '../utils/user.utils'
import UserRepositoryInterface from '../repositories/interfaces/user-repository.interface'
import UserServiceInterface from './interfaces/user-service.interface'

export default class UserService implements UserServiceInterface {
  constructor(private userRepository: UserRepositoryInterface) {}

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
