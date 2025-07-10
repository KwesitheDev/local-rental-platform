const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')

const login = async (req, res) => {
    

    try {
       const {email, password } = req.body 

        const user = await User.findOne({email})
        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)

        if (!user || !isPasswordCorrect) {
            return res.status(401).json({ error: 'invalid username or password' })
        }

        const userForToken = {
            email: user.email,
            id: user._id,
            role: user.role
        }

        const token = jwt.sign(userForToken, config.SECRET, { expiresIn: '3d' })
        
        res.status(200).json({
            token,
            name: user.name,
            email:user.email,
            role: user.role,
            id: user.id, 

        })

    }catch (error) {
        console.log(error)
        res.status(500).json({ error: 'something went wrong' })
    }
}

export default {
    login
}