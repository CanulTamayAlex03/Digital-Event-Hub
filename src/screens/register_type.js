import React from 'react';
import { Button, Typography, Layout, Space, Card } from 'antd';
import Navbar from '../components/default_nav';
import icon from '../assets/icons/user.png';
import { Link } from 'react-router-dom';


const { Content } = Layout;
const { Title } = Typography;

const RegisterType = () => (
    <Layout style={{ minHeight: '100vh' }}>
        <Navbar />
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ padding: '75px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                <Space direction="vertical" align="center" size="large">
                    <img src={icon} alt="User Icon" style={{ width: '75px', height: '75px' }} />
                    <Title level={3}>Registrarse como:</Title>
                    <Button
                        type="primary"
                        size="large"
                        style={{ backgroundColor: '#5A2D82', borderColor: '#000000', width: '250px', height: '55px' }}
                    >
                        <Link to="/registerClient" rel="noopener noreferrer">
                            Cliente
                        </Link>
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        style={{ backgroundColor: '#5A2D82', borderColor: '#000000', width: '250px', height: '55px' }}
                    >
                        <Link to="/registerOrganizer" rel="noopener noreferrer">
                            Organizador
                        </Link>
                    </Button>
                </Space>
            </Card>
        </Content>
    </Layout>
);

export default RegisterType;
