import { Request, Response, Router } from 'express'
import UserRepository from '../repositories/user.repository'
import jwt from 'jsonwebtoken'

const router = Router()

const { SECRET_KEY } = process.env

router.post('/api/v1/login', async (req: Request, res: Response) => {
  const user = await new UserRepository().authenticateUser(
    req.body.email,
    req.body.password
  )

  if (!user) return res.status(403).json({ error: 'invalid email or password' })

  const accessToken = jwt.sign({ sub: user.id }, SECRET_KEY!, {
    expiresIn: '10m'
  })

  res.status(200).json({ accessToken, expiresIn: 600 })
})

export default router
