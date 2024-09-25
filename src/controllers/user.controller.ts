import { NextFunction, Request, Response } from 'express'
import User from '../model/user.model'
import UserService from '../services/user.service'

export default class UserController {
  constructor(private userService: UserService) {}

  post = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body
      const user = new User(name, email, password)

      const { id } = await this.userService.save(user)

      return res.status(201).json({ id })
    } catch (e) {
      next(
        new Error(
          'oops, an internal error occurred and it was not possible to create this user'
        )
      )
    }
  }
}
