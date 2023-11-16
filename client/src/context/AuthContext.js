import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true); // Permite que os componentes filhos sejam executados somente quando o token tiver sido validado

  useEffect(() => {
    // Função para fazer a chamada à API para validar o token
    const validateToken = async (token) => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/validation', {
          headers: {
            Authorization: token,
          },
        });

        if (response.data.valid) {
          // Token é válido, usuário está logado
          setLoggedUser(response.data.user);
        } else {
          // Token é inválido ou expirado
          setLoggedUser(null);
        }
      } catch (error) {
        // Erro ao validar o token
        console.error('Erro ao validar o token:', error);
      } finally {
        // Defina loading como false após a conclusão
        setLoading(false);
      }
    };
    // Função para buscar o token no localStorage
    const token = localStorage.getItem('@Auth:token');

    if (token) {
      // Se há um token no localStorage, valide-o na API
      validateToken(token);
    } else {
      // Se não há token, o usuário não está logado
      setLoggedUser(null);
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
      }}
    >
      {loading ? <p>Carregando...</p> : children}
    </AuthContext.Provider>
  );
};