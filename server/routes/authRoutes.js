const express = require('express');
const { register, login, validation } = require('../controllers/authController');
const {upload} = require('../middlewares/authMiddlewares');
const router = express.Router();

// Rota para registrar um novo usuário
// Utiliza o middleware 'upload' para lidar com o envio da foto de perfil ('profilePicture')
router.post('/register', upload.single('profilePicture'), register);

// Rota para efetuar o login de um usuário
router.post('/login', login);

// Rota para validar a autenticação de um usuário
router.get('/validation', validation);

module.exports = router;