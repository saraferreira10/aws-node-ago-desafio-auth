import UserInterface from '../../model/interfaces/user.interface'

export default interface UserRepositoryInterface {
  save: (user: UserInterface) => Promise<{ result: unknown; id: string }>
  findByEmail: (email: string) => Promise<UserInterface>
}
