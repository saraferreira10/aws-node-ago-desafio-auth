import User from '../../model/user.model'

export default interface UserServiceInterface {
  save: (user: User) => Promise<{ result: unknown; id: string }>
}
