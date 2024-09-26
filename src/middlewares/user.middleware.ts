import { NextFunction, Request, Response } from 'express'
import CustomError from '../types/error.type'

export function checkRequiredFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email, password } = req.body
  const fields = [
    { field: 'name', value: name },
    { field: 'email', value: email },
    { field: 'password', value: password }
  ]

  for (const { field, value } of fields) {
    if (!value || value.trim() === '')
      throw new CustomError(400, `${field} is required`)
  }

  next()
}

export function checkIfEmailIsValid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]/

  if (!regex.test(email)) throw new CustomError(400, 'email is invalid')

  next()
}

export function checkIfPasswordIsValid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const password: string = req.body.password

  if (
    password.trim().length < 6 ||
    !/[A-Za-z]/.test(password) ||
    !/\d/.test(password)
  ) {
    throw new CustomError(
      400,
      'password must be at least 6 characters long with letters and numbers'
    )
  }

  next()
}
