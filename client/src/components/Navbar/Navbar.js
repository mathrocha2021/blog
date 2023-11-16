import React, { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import {Nav, NavItem} from './Navbar.styles';

function Navbar() {
    const {loggedUser} = useContext(AuthContext);
    const location = useLocation();
    const {id} = useParams();

    return (
        <Nav>
            <NavItem href="/home" active={location.pathname === '/home'}>Home</NavItem>
            <NavItem href={loggedUser} active={id === loggedUser}>Profile</NavItem>
            <NavItem href="/logout" active={location.pathname === '/logout'}>Logout</NavItem>
        </Nav>
    );
}

export default Navbar;