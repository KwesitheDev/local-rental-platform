import express from 'express';
import mongoose from 'mongoose';

import authRouter from './routes/auth.js';
import listingRouter from './routes/listing.js';
import userRouter from './routes/user.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/user', userRouter);

export default app;
