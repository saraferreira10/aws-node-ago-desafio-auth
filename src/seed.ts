import User from './model/user.model'
import UserRepository from './repositories/user.repository'
import UserService from './services/user.service'
import CustomError from './types/error.type'

const { DEFAULT_USER_NAME, DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD } =
  process.env

export default async function createDefaultUser() {
  try {
    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)
    const user = new User(
      DEFAULT_USER_NAME!,
      DEFAULT_USER_EMAIL!,
      DEFAULT_USER_PASSWORD!
    )
    await userService.save(user)
  } catch (e: unknown) {
    if (e instanceof Error) {
      if (e instanceof CustomError && e.status === 409) return

      console.log('error when creating defaul user:', e.message)
    }
  }
}
