import dotenv from 'dotenv';
import express from 'express';
import connectDB from './models/db';
import { router } from './routes/routes';

dotenv.config();
const app = express();

// CONNECT TO THE DATABASE
connectDB();

app.use(express.json());

// ROUTES
app.use(router);

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});