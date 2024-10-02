import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import CustomError from './types/error.type'
import userRouter from './routes/user.routes'
import authRouter from './routes/auth.routes'

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(userRouter)
app.use(authRouter)

app.use('', (req: Request, res: Response) =>
  res.status(404).json({ error: 'not found' })
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({
      error: error.message
    })
  }

  return res.status(500).json({
    error: 'internal server error'
  })
})

app.listen(3000, () => console.log('listening...'))
