import express from 'express'
import { World } from '../controller/World'
export const worldRoute=express.Router()


worldRoute.get('/world',World)