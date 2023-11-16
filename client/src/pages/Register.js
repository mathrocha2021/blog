// Register.js
import React, { useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import RegisterForm from '../components/Register/RegisterForm';

function Register() {
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!loggedUser) {
    return (
      <RegisterForm />
    )
  } else {
    return <Navigate to="/home" />;
  }
}

export default Register;