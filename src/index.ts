import express from 'express'
import cors from 'cors'
import router from './routes/user.routes'

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(3000, () => console.log('listening...'))
