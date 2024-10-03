import { Request, Response, Router } from 'express'
import UserController from '../controllers/user.controller'
import UserRepository from '../repositories/user.repository'
import UserService from '../services/user.service'
import { authenticate } from '../middlewares/auth.middleware'

const router = Router()

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

router.route('/api/v1/users').post(authenticate, userController.post)

router.get('', (req: Request, res: Response) =>
  res.status(404).json({ status: 'error', message: 'resource not found' })
)

export default router
