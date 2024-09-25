import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import router from './routes/user.routes'
import CustomError from './types/error.type'

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

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
