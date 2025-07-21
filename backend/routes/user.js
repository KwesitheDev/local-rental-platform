import express from 'express'
import { getUser, getProfile, updateProfile, deleteUser } from "../controllers/user.js"
import { requireAuth } from "../middleware/auth.js"
const userRouter = express.Router()

userRouter.get('/user/:name', getUser)
userRouter.get('/profile', requireAuth, getProfile)
userRouter.put('/profile', requireAuth, updateProfile)
userRouter.delete('/profile', requireAuth, deleteUser)

export default userRouter
