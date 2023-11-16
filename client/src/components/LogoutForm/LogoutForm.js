import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {LogoutContainer, Title, LogoutButton} from './Logout.styles';

function LogoutForm() {
  const { setLoggedUser } = useContext(AuthContext);

  const signOut = () => {
    localStorage.clear();
    setLoggedUser(null);
    return <Navigate to="/" />;
  };

  return (
    <LogoutContainer>
        <Title>Você deseja sair?</Title>
        <LogoutButton onClick={signOut}>Logout</LogoutButton>
    </LogoutContainer>
  );
}

export default LogoutForm;