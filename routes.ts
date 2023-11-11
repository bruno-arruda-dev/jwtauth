import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({msg: "Bem vindo a rota pública!"});
})

router.get('/user', (req, res) => {
    res.status(200).json({msg: "Bem vindo a rota de usuario!"})
})

export { router };