// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/configApi';
import {RegisterContainer, Title, Form, Input, Button, Error, LoginLink} from './Register.styles';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Verifique se os campos 'username', 'email', 'password' e 'profilePicture' estão preenchidos
    if (!username) {
      setError('O campo "Nome de usuário" é obrigatório.');
      return;
    }

    if (!email) {
      setError('O campo "E-mail" é obrigatório.');
      return;
    }

    if (!password) {
      setError('O campo "Senha" é obrigatório.');
      return;
    }
    
    if (!profilePicture) {
      setError('O campo "Foto de perfil" é obrigatório.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profilePicture', profilePicture);

    try {
      const response = await api.post('/auth/register', formData);

      if (response.status === 201) {
        console.log(response)
        // Registro bem-sucedido, pode redirecionar o usuário para página de login.
        return navigate('/');
      }
    } catch (err) {
      console.error(err);
      if (err.response.status === 400) {
        // Verifica se a resposta da API é um erro de e-mail já existente
        setError('E-mail já está em uso. Por favor, escolha outro endereço de e-mail.');
      } else {
        setError('Erro ao criar usuário. Verifique seus dados e tente novamente.');
      }
    }
  };

  return (
    <RegisterContainer>
      <Title>Registro</Title>
      <Form onSubmit={handleRegister}>
        <Input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          autocomplete="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          autocomplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          autocomplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />        
        <Button type="submit">Registrar</Button>
      </Form>
      {error && <Error>{error}</Error>}
      <LoginLink>Já tem uma conta? <a href='/login'>Acesse aqui</a></LoginLink>
    </RegisterContainer>
  );
}

export default RegisterForm;