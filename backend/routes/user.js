const userRouter = require("express").Router()
const { getUser, getProfile, updateProfile, deleteUser } = require("../controllers/user")
const { requireAuth } = require("../middleware/auth")

userRouter.get('/user/:name', getUser)
userRouter.get('/profile', requireAuth, getProfile)
userRouter.put('/profile', requireAuth, updateProfile)
userRouter.delete('/profile', requireAuth, deleteUser)

module.exports = userRouter
