import express from 'express'
import cors from 'cors'
import UserRepository from './repositories/user.repository'
import User from './model/user.model'

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// new UserRepository().save(new User('jose', 'joe@gmail.com', 'senha'))

app.listen(3000, () => console.log('listening...'))
