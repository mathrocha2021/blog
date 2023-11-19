import React, { useState, useContext } from 'react';
import api from '../../config/configApi';
import { AuthContext } from "../../context/AuthContext";
import {Title, Form, Input, Button, LoginContainer, RegisterLink, Error} from './LoginForm.styles';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { setLoggedUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verifique se os campos 'email' e 'password' estão preenchidos
    if (!email) {
      setError('O campo "E-mail" é obrigatório.');
      return;
    }

    if (!password) {
      setError('O campo "Senha" é obrigatório.');
      return;
    }
    
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem("@Auth:token", response.data.token);
      setLoggedUser(response.data.user._id);

    } catch (error) {
      console.error(error);
      if (error.response.status === 404) {
        setError("O email inserido não corresponde a um usuário.");
      } else if (error.response.status === 401) {
        setError("Senha incorreta. Verifique suas credenciais.");
      } else {
        setError("Ocorreu um erro ao fazer login. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Entrar</Button>
      </Form>
      {error && <Error>{error}</Error>}
      <RegisterLink>Não tem uma conta? <a href='/register'>Cadastre-se</a></RegisterLink>
    </LoginContainer>
  );
}

export default LoginForm;