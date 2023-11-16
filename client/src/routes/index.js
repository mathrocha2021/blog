import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "./privateRoutes";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Logout from '../pages/Logout';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* Rota protegida que usa o componente PrivateRoute */}
        <Route element={<PrivateRoute/>}>
          <Route path='/home' element={<Home />} />
          <Route path='/:userId' element={<Profile />} />
          <Route path='/logout' element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;