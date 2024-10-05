import UserInterface from '../../model/interfaces/user.interface'

export default interface AuthRepositoryInterface {
  findActiveUserByEmail: (email: string) => Promise<UserInterface | undefined>
}
