const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'API: Erro ao buscar usuários.' });
    }
  }

const createUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Verifique se o campo 'username' foi fornecido
      if (!username) {
        return res.status(400).json({ message: 'API: O campo "username" é obrigatório.' });
      }
  
      // Verifique se o campo 'email' foi fornecido
      if (!email) {
        return res.status(400).json({ message: 'API: O campo "email" é obrigatório.' });
      }
  
      // Verifique se o campo 'password' foi fornecido
      if (!password) {
        return res.status(400).json({ message: 'API: O campo "password" é obrigatório.' });
      }
  
      // Crie uma instância do modelo User com os dados fornecidos
      const newUser = new User({ username, email, password });
  
      // Salve o novo usuário no banco de dados
      await newUser.save();
  
      res.status(201).json({ message: 'API: Usuário criado com sucesso', user: newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'API: Erro ao criar usuário.' });
    }
  }

// Rota para obter um usuário por ID
const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('posts'); // Popule o campo 'posts' com os dados dos posts
      if (!user) {
        return res.status(404).json({ error: 'API: Usuário não encontrado' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const updateUser = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'API: Usuário não encontrado.' });
      }
      res.status(200).json({ message: 'API: Usuário atualizado com sucesso', user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'API: Erro ao atualizar usuário.' });
    }
  }

const deleteUser = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'API: Usuário não encontrado.' });
      }
      res.status(200).json({ message: 'API: Usuário excluído com sucesso', user: deletedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'API: Erro ao excluir usuário.' });
    }
  }

module.exports = {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
}