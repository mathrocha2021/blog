const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Verifique se os campos 'username', 'email' e 'password' não estão vazios
  if (!username) {
    return res.status(400).json({ message: 'API: O campo "username" é obrigatório.' });
  }

  if (!email) {
    return res.status(400).json({ message: 'API: O campo "email" é obrigatório.' });
  }

  if (!password) {
    return res.status(400).json({ message: 'API: O campo "password" é obrigatório.' });
  }

  // Verifique se um arquivo de imagem foi enviado
  if (!req.file) {
    return res.status(400).json({ message: 'API: O campo "profilePicture" é obrigatório.' });
  }

  // Obtenha o arquivo de imagem do corpo da solicitação
  const profilePicture = req.file;

  // Validação e verificação de duplicatas (você pode adicionar mais verificações aqui)
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'API: Este "email" já está em uso.' });
  }

  const saltRounds = 10;

  // Gera um hash da senha usando bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Cria uma nova instância de usuário com os dados fornecidos, incluindo o nome do arquivo da foto de perfil
  const newUser = new User({ username, email, password: hashedPassword, profilePicture: profilePicture.filename });

  try {
    await newUser.save();
    res.status(201).json({ message: 'API: Usuário registrado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'API: Erro ao criar usuário.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  // Verifique se os campos 'username', 'email' e 'password' não estão vazios
  if (!email) {
    return res.status(400).json({ message: 'API: O campo "email" é obrigatório.' });
  }

  if (!password) {
    return res.status(400).json({ message: 'API: O campo "password" é obrigatório.' });
  }

  // Verifique se o 'email' está cadastrado
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'API: Usuário não encontrado.' });
  }

  // Verifica se a senha fornecida é válida comparando-a com a senha armazenada no banco de dados
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'API: Credenciais inválidas.' });
  }

  // Gere um token JWT após a autenticação bem-sucedida
  const token = jwt.sign({ userId: user._id }, 'seu_segredo_secreto', { expiresIn: '1h' });

  res.status(200).json({ message: 'API: Login bem-sucedido', token, user: { _id: user._id, username: user.username, email: user.email } });
};

const validation = (req, res) => {
  
  // Obtém o token do cabeçalho 'Authorization'
  const token = req.header('Authorization');

  // Verifica se o token foi fornecido
  if (!token) {
    return res.status(401).json({ message: 'API: Token não fornecido.' });
  }

  try {

    // Tenta decodificar o token usando a chave secreta 'seu_segredo_secreto'
    const decoded = jwt.verify(token, 'seu_segredo_secreto');

    res.status(200).json({ valid: true, user: decoded.userId });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'API: Token inválido ou expirado.' });
  }
};

module.exports = { register, login, validation };

