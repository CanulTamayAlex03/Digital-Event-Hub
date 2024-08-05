import React from 'react';
import { Button, Typography, Layout, Space, Card } from 'antd';
import Navbar from '../components/default_nav';
import icon from '../assets/icons/user.png';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const LoginType = () => (
    <Layout style={{ minHeight: '100vh' }}>
        <Navbar />
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ padding: '75px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                <Space direction="vertical" align="center" size="large">
                    <img src={icon} alt="User Icon" style={{ width: '75px', height: '75px' }} />
                    <Title level={3}>Iniciar sesión como:</Title>
                    <Button
                        type="primary"
                        size="large"
                        style={{ backgroundColor: '#5A2D82', borderColor: '#000000', width: '250px', height: '55px' }}
                    >
                        <Link to="/loginClient" rel="noopener noreferrer">
                            Cliente
                        </Link>
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        style={{ backgroundColor: '#5A2D82', borderColor: '#000000', width: '250px', height: '55px' }}
                    >
                        <Link to="/loginOrganizer" rel="noopener noreferrer">
                            Organizador
                        </Link>
                    </Button>
                </Space>
            </Card>
        </Content>
        <Button
            type="primary"
            size="large"
            style={{
                position: 'fixed',
                top: '100px',
                left: '40px',
                backgroundColor: '#000000',
                borderColor: '#000000',
                width: '190px',
                height: '45px',
                borderRadius: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                fontSize: '16px',
                fontWeight: 'bold',
            }}
        >
            <Link to="/loginAdmin" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }} rel="noopener noreferrer">
                Soy administrador
            </Link>
        </Button>
    </Layout>
);

export default LoginType;
