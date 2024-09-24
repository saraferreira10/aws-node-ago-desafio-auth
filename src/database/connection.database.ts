import dotenv from 'dotenv'
import path from 'path'
import mysql from 'mysql2/promise'

dotenv.config({
  path: path.resolve(__dirname, '..', '..', 'src', 'config', '.env')
})

const { DATABASE, PASSWORD, USER } = process.env

const connection = mysql.createPool({
  user: USER,
  database: DATABASE,
  password: PASSWORD
})

export default connection
