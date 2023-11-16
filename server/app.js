const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Configuração de middleware para lidar com solicitações JSON
app.use(express.json());

// Habilita o CORS para todas as origens (não é recomendado para produção)
app.use(cors());

const mongoURI = process.env.MONGO_URI;

// Conectar ao MongoDB usando mongoose
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Configuração da conexão com o MongoDB usando Mongoose, incluindo tratamento de erros e mensagem de sucesso.
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
connection.once('open', () => {
  console.log('Conexão com o MongoDB estabelecida com sucesso.');
});

// Importar rotas relacionadas à autenticação, usuários e posts
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

// Utilizar as rotas importadas
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Iniciar o servidor na porta especificada
app.listen(port, () => {
  console.log("Servidor rodando na porta 3000");
});
