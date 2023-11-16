const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');

const getPosts = async (req, res) => {
    try {
      
      // Busca todas as publicações no banco de dados e popula o campo 'author' com os dados do autor
      const posts = await Post.find().populate('author');
      res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'API: Erro ao buscar publicações.' });
    }
  }

  const createPost = async (req, res) => {

    try {
      const { title, content, loggedUser } = req.body;

      // Verifique se o campo 'title' foi fornecido
      if (!title) {
        return res.status(400).json({ message: 'API: O campo "title" é obrigatório.' });
      }
  
      // Verifique se o campo 'content' foi fornecido
      if (!content) {
        return res.status(400).json({ message: 'API: O campo "content" é obrigatório.' });
      }

      // Verifique se o usuário está autenticado
      if (!loggedUser) {
        return res.status(400).json({ message: 'API: O usuário precisa estar autenticado.' });
      }

      // Obter o arquivo de imagem do corpo da solicitação
      const image = req.file;

      // Crie uma instância do modelo User com os dados fornecidos
      const newPost = new Post({ 
        title,
        content,
        author: loggedUser,
        imageName: image ? image.filename : "",
      });

      // Salve a nova publicação no banco de dados
      await newPost.save();
      
      // Adiciona a nova publicação ao banco de dados do usuário correspondente
      const user = await User.findById(loggedUser);
      user.posts.push(newPost._id);
      await user.save();

      res.status(201).json({ message: 'API: Publicação criada com sucesso', post: newPost });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao criar publicação.', err });
    }
}

const getPost = async (req, res) => {
    try {
      
      // Busca uma publicação pelo ID fornecido nos parâmetros da requisição e popula o campo 'author' com os dados do autor
      const post = await Post.findById(req.params.postId).populate('author');
      
      // Verifica se a publicação foi encontrada
      if (!post) {
        return res.status(404).json({ message: 'API: Publicação não encontrada.' });
      }
      res.status(200).json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'API: Erro ao buscar publicação.' });
    }
  }

  const updatePost = async (req, res) => {
    try {
      const postId = req.params.postId; // Obtenha o ID do post a ser atualizado a partir dos parâmetros da rota
      const { title, content } = req.body; // Obtenha os dados atualizados do corpo da solicitação
  
      // Encontre o post no banco de dados pelo ID
      const post = await Post.findById(postId);
  
      // Verifique se o post existe
      if (!post) {
        return res.status(404).json({ message: 'API: Post não encontrado.' });
      }
  
      // Atualize os campos do post com os novos dados
      post.title = title;
      post.content = content;
      post.updatedAt = new Date(); // Atualize a data de atualização
  
      // Salve o post atualizado no banco de dados
      await post.save();
  
      res.status(200).json({ message: 'API: Post atualizado com sucesso', post });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'API: Erro ao atualizar o post.' });
    }
  };  

const deletePost = async (req, res) => {
    try {

      // Encontre e delete o post no banco de dados pelo ID
      const deletedPost = await Post.findByIdAndDelete(req.params.postId);
      if (!deletedPost) {
        return res.status(404).json({ message: 'API: Publicação não encontrada.' });
      }
      
      // Excluir a imagem associada ao post no sistema de arquivos
      const imageName = deletedPost.imageName;
      if (imageName) {
        fs.unlinkSync(`..\\client\\public\\images\\${imageName}`); // Certifique-se de importar o módulo 'fs'
      }

      res.status(200).json({ message: 'API: Publicação excluída com sucesso', post: deletedPost });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'API: Erro ao excluir publicação.' });
    }
  }

module.exports = {
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost
}