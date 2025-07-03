const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userRouter = require('express').Router();

userRouter.post('/login', async (req, res) => {
    const body = req.body;

    const user = await User.findOne({ username: body.username });
    const passwordCorrect = (user === null)
        ? false
        : await bcrypt.compare(body.password, user.passwordHash);
    
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        });
    }

    const userForToken = {
        username: user.username,
        id: user._id
    };

    const token = jwt.sign(userForToken, config.SECRET);
    res
        .status(200)
        .send({ token, username: user.username, name: user.name });
    
})

userRouter.post('/register', async (req, res) => {
    const body = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      firstName: body,firstName,
      lastName: body.lastName,
      middleName: body.middleName,
      userType: body.userType,
      email: body.email,
      phone: body.phone,
    });   

    const savedUser = await user.save();

    res.json(savedUser);
})

module.exports = userRouter;