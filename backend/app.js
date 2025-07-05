const express = require('express');
const mongoose = require('mongoose');
const app = express();
//setup routes when created 

app.use(express.json());

module.exports = app