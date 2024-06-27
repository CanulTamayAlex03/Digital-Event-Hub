import React from 'react';
import Navbar from '../../components/default_nav';
import { Card, Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ClientLogin = () => {
    const onFinish = (values) => {
        console.log('Received values:', values);
        // Lógica de inicio de sesión
    };

    return (
        <div>
            <Navbar />
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <Card style={{ width: 300, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>Inicio de sesión como cliente</Title>
                    <Form
                        name="normal_login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Por favor ingresa tu usuario!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Usuario" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="Contraseña"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#8e44ad', borderColor: '#8e44ad' }}>
                                Iniciar sesión
                            </Button>
                        </Form.Item>
                    </Form>
                    <Text style={{ textAlign: 'center' }}>¿No tienes cuenta? <a href="/registro">Regístrate</a></Text>
                </Card>
            </div>
        </div>
    );
};

export default ClientLogin;
