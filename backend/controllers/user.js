const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');


usersRouter.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body

    //check for email and password not missing
    if (!email || !password) {
        return res
                .status(400)
                .json({ error: 'email and password are required' })

    }

    //Check for length of useremail & password
    if (email.length < 3 || password.length < 3) {
        return res.status(400).json({ error: 'email and password must be at least 3 characters long' })
    }

    //Check for unique email
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ error: 'email must be unique' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        name,
        passwordHash,
        email,
        role
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
})
