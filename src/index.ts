import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import router from './routes/user.routes'

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) =>
  res.status(500).json({
    error: error.message || 'internal server error'
  })
)

app.listen(3000, () => console.log('listening...'))
