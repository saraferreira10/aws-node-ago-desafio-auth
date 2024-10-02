import { Request, Response, Router } from 'express'
import UserRepository from '../repositories/user.repository'

const router = Router()

router.post('/api/v1/login', async (req: Request, res: Response) => {
  const authenticate = await new UserRepository().authenticateUser(
    req.body.email,
    req.body.password
  )

  if (!authenticate)
    return res.status(403).json({ error: 'invalid email or password' })
  res.status(200).json({ status: 'success' })
})

export default router
