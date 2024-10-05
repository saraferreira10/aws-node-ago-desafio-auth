import { Request, Response } from 'express'
import AuthServiceInterface from '../services/interfaces/auth-service.interface'
import jwt from 'jsonwebtoken'

const { SECRET_KEY } = process.env

export default class AuthController {
  constructor(private authService: AuthServiceInterface) {}

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ error: 'bad request' })

    const user = await this.authService.authenticate(email, password)

    if (!user)
      return res.status(403).json({ error: 'invalid email or password' })

    const accessToken = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      SECRET_KEY!,
      {
        expiresIn: '10m'
      }
    )

    res.status(200).json({ accessToken, expiresIn: 600 })
  }
}
