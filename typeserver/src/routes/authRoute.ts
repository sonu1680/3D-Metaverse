import express from 'express'
import { Login } from '../controller/auth/Login'
  const authRoute=express.Router()

authRoute.post('/auth',Login)

export default  authRoute