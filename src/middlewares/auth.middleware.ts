import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import CustomError from '../types/error.type'

export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.get('Authorization')?.split(' ')[1]

    if (!token) throw new CustomError(403, 'invalid token')

    jwt.verify(token, process.env.SECRET_KEY!, (error) => {
      if (error) throw new CustomError(403, 'invalid token')
    })

    next()
  } catch (error) {
    next(error)
  }
}
