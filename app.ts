import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { router } from './routes';

const app = express();

app.use('/', router);
app.use('/user', router);

app.listen(3000);