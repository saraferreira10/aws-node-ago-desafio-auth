import User from '../model/user.model'

export function validateFields(user: User) {
  const { name, email, password } = user
  const fields = [
    { field: 'name', value: name },
    { field: 'email', value: email },
    { field: 'password', value: password }
  ]

  for (const { field, value } of fields) {
    if (!value || value.trim() === '')
      return { isValid: false, error: `${field} is required` }
  }

  return { isValid: true }
}

export function isEmailValid(email: string) {
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]/
  return regex.test(email)
}

export function isPasswordValid(password: string) {
  const isValid =
    password.trim().length >= 6 &&
    /[A-Za-z]/.test(password) &&
    /\d/.test(password)

  return isValid
}
