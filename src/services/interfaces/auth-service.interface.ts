import UserInterface from '../../model/interfaces/user.interface'

export default interface AuthServiceInterface {
  authenticate: (
    email: string,
    password: string
  ) => Promise<UserInterface | undefined>
}
