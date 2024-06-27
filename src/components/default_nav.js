// src/components/Navbar.js
import React from 'react';
import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './default_nav.css';

const Navbar = () => (
    <div className="navbar">
        <div className="navbar-left">
            <img src={logo} alt="Logo" className="logo" />
            <Menu mode="horizontal" style={{ backgroundColor: '#6D3089', borderBottom: 'none', flex: 1 }}>
                <Menu.Item key="home">
                    <Link to="/" className="nav-link">Inicio</Link>
                </Menu.Item>
                <Menu.Item key="terms">
                    <Link to="/terms" className="nav-link">Términos y Condiciones</Link>
                </Menu.Item>
                <Menu.Item key="knowUs">
                    <Link to="/knowUs" className="nav-link">Conócenos</Link>
                </Menu.Item>
                <Menu.Item key="plans">
                    <Link to="/plans" className="nav-link">Planes</Link>
                </Menu.Item>
            </Menu>
        </div>
        <Button type="primary" className="access-button">
            <Link to="/loginType" rel="noopener noreferrer">
                Iniciar sesión
            </Link>
        </Button>
        <Button type="primary" className="register-button">
            <Link to="/registerType" rel="noopener noreferrer">
                Registrarse
            </Link>
        </Button>
    </div>
);

export default Navbar;
