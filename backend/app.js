const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth')
const listingRouter = require('./routes/listing')
const userRouter = require('./routes/user')
const app = express();

//setup routes when created 

app.use(express.json());

//Routes
app.use('api/auth', authRoouter)
app.use('api/listing', listingRouter)
app.use('api/user', userRouter)

module.exports = app