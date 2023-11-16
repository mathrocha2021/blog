const express = require('express');
const router = express.Router();
const {getUsers, createUser, getUser, updateUser, deleteUser} = require('../controllers/usersController');

// Rota para listar todos os usuários
router.get('/', getUsers);

// Rota para criar um novo usuário
router.post('/', createUser);

// Rota para mostrar um usuário específico
router.get('/:userId', getUser);

// Rota para editar um usuário específico
router.put('/:userId', updateUser);

// Rota para excluir um usuário específico
router.delete('/:userId', deleteUser);

module.exports = router;