import React from 'react';
import Navbar from '../../components/default_nav';
import { Card, Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ClientRegister = () => {
    const onFinish = (values) => {
        console.log('Received values:', values);
        // Lógica de registro
    };

    return (
        <div>
            <Navbar />
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#f0f2f5' }}>
                <Card style={{ width: 300, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#F8F9FA' }}>
                    <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>Regístrate</Title>
                    <Form
                        name="normal_register"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Email" style={{ backgroundColor: '#CEBED9' }} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Por favor ingresa una contraseña!' }]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="Contraseña"
                                style={{ backgroundColor: '#CEBED9' }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'Por favor confirma tu contraseña!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Las contraseñas no coinciden!'));
                                    },
                                }),
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="Confirmar contraseña"
                                style={{ backgroundColor: '#CEBED9' }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#8e44ad', borderColor: '#8e44ad' }}>
                                Registrarse
                            </Button>
                        </Form.Item>
                    </Form>
                    <Text style={{ textAlign: 'center' }}>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></Text>
                </Card>
            </div>
        </div>
    );
};

export default ClientRegister;
