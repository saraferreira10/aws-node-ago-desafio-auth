import { Router } from 'express'
import UserController from '../controllers/user.controller'
import UserRepository from '../repositories/user.repository'

const router = Router()

const userRepository = new UserRepository()
const userController = new UserController(userRepository)

router
  .route('/api/v1/users')
  .post(userController.post)
  .get((req, res) => res.send('deu certo'))

export default router
