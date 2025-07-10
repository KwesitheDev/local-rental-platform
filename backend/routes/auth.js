const authRouter = express.Router()
const {  login, register } = require('../controllers/authController')

authRouter.post('/register', register)
authRouter.post('/login', login)

module.exports = authRouter
