import express from 'express';
import { RegisterController } from '../controllers/RegisterController';
import { AutenticateController } from '../controllers/AutenticateController';
import { UpdateUserController } from '../controllers/UpdateUserController';
const router = express.Router();


// USER REGISTER
router.post('/auth/register', async (req, res) => {
    return new RegisterController().handle(req, res);
})

// LOGIN
router.post('/auth/login', async (req, res) => {
    return new AutenticateController().handle(req, res);
})

// USER UPDATE DATA
router.put('/user/:id', (req, res) => {
    return new UpdateUserController().handle(req, res);
})

export { router };