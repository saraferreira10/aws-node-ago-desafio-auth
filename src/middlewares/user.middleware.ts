import { NextFunction, Request, Response } from 'express'

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
    if (!value || value.trim() === '') {
      return res.status(400).json({ error: `${field} is required` })
    }
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

  if (!regex.test(email))
    return res.status(400).json({ error: 'email is invalid' })

  next()
}
