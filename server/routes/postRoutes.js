const express = require('express');
const router = express.Router();
const {getPosts, createPost, getPost, updatePost, deletePost} = require('../controllers/postsController');
const {upload} = require('../middlewares/postsMiddleawares');

// Rota para listar todos os posts
router.get('/', getPosts);

// Rota para criar um novo post
router.post('/', upload.single('image'), createPost);

// Rota para mostrar um post específico
router.get('/:postId', getPost);

// Rota para editar um post específico
router.put('/:postId', updatePost);

// Rota para excluir um post específico
router.delete('/:postId', deletePost);

module.exports = router;