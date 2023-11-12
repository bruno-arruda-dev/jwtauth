import dotenv from 'dotenv';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from './models/db';
import { router } from './routes/routes';

dotenv.config();
const app = express();

// CONNECT TO THE DATABASE
connectDB();

// ROUTES
app.use(router);

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});