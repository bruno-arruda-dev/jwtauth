import express from 'express';
import { RegisterController } from '../controllers/RegisterController';
import { AutenticateController } from '../controllers/AutenticateController';
const router = express.Router();

router.post('/auth/register', async (req, res) => {
    return new RegisterController().handle(req, res);
})

router.post('/auth/login', async (req, res) => {
    return new AutenticateController().handle(req, res);
})

router.get('/user/:id', (req, res) => {
    res.status(200).json({msg: "Bem vindo a rota privada!"});
})

export { router };