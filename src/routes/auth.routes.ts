import { Router } from 'express'
import AuthService from '../services/auth.service'
import AuthRepository from '../repositories/auth.repository'
import AuthController from '../controllers/auth.controller'

const router = Router()

const authRepository = new AuthRepository()
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

router.post('/api/v1/login', authController.login)

export default router
