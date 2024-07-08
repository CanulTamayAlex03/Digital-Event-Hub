import React from 'react';
import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './default_nav.css';

const ClientNavbar = () => (
    <div className="navbar">
        <div className="navbar-left">
            <img src={logo} alt="Logo" className="logo" />
            <Menu mode="horizontal" style={{ backgroundColor: '#6D3089', borderBottom: 'none', flex: 1 }}>
                <Menu.Item key="home">
                    <Link to="/homeOrganizer" className="nav-link">Inicio</Link>
                </Menu.Item>
               
            </Menu>
        </div>
        <Button type="primary" className="access-button">
            <Link to="/loginType" rel="noopener noreferrer">
                Salir
            </Link>
        </Button>
    </div>
);

export default ClientNavbar;