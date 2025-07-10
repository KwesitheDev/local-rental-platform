const authRouter = express.Router()
const {  login } = require('../controllers/authController')

//authRouter.post('/register', register)
authRouter.post('/login', login)

module.exports = authRouter
