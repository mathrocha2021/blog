import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function PrivateRoute() {
  // Obtém o usuário logado do contexto de autenticação
  const { loggedUser } = useContext(AuthContext);

  // Renderiza o componente Outlet se houver um usuário logado,
  // caso contrário, redireciona para a página inicial ("/")
  return loggedUser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;