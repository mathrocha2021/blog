// Login.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm';
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { loggedUser } = useContext(AuthContext);

  if (!loggedUser) {
    return (
      <LoginForm />
    );
  } else {
    return <Navigate to="/home" />;
  }
}

export default Login;