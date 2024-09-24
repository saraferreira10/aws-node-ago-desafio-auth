import { Request, Response } from 'express'
import UserRepository from '../repositories/user.repository'
import User from '../model/user.model'

export default class UserController {
  constructor(private repo: UserRepository) {}

  async post(req: Request, res: Response) {
    const { name, email, password } = req.body
    const user = new User(name, email, password)

    const [result] = await this.repo.save(user)
    res.status(201).json({ id: result.insertId })
  }
}
