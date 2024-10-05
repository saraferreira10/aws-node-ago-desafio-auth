import { NextFunction, Request, Response } from 'express'
import User from '../model/user.model'
import CustomError from '../types/error.type'
import UserServiceInterface from '../services/interfaces/user-service.interface'

export default class UserController {
  constructor(private userService: UserServiceInterface) {}

  post = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body
      const user = new User(name, email, password)

      const { id } = await this.userService.save(user)

      return res.status(201).json({ id })
    } catch (e: unknown) {
      if (e instanceof CustomError) {
        return next(e)
      }

      next(
        new CustomError(
          500,
          'oops, an internal error occurred and it was not possible to create this user'
        )
      )
    }
  }
}
