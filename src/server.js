// src/server.js

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { errors as celebrateErrors } from 'celebrate';

import authRouter from './routes/authRoutes.js';
import notesRouter from './routes/notesRoutes.js';

import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// Routes
app.use(authRouter);
app.use(notesRouter);
app.use(userRoutes);


app.use(notFoundHandler);
app.use(celebrateErrors());
app.use(errorHandler);



await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
