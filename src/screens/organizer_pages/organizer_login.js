import React, { useState } from 'react';
import Navbar from '../../components/default_nav';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const OrganizerLogin = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onFinish = async (values) => {
        setLoading(true);

        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    contrasena: values.contrasena,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.token) {
                // Guardar el token en localStorage o sessionStorage
                localStorage.setItem('token', data.token);

                message.success('Inicio de sesión exitoso');
                // Redirigir a la página de inicio del organizador
                window.location.href = '/homeOrganizer';
            } else {
                message.error(data.message || 'Error en el inicio de sesión');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            message.error('Error en el inicio de sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#f0f2f5' }}>
                <Card style={{ width: 350, height: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#F8F9FA' }}>
                    <Title level={3} style={{ textAlign: 'center', marginBottom: 30 }}>Inicio de sesión como organizador</Title>
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Por favor ingresa tu correo!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Correo" style={{ backgroundColor: '#CEBED9' }} />
                        </Form.Item>
                        <Form.Item
                            name="contrasena"
                            rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Contraseña"
                                style={{ backgroundColor: '#CEBED9' }}
                                suffix={
                                    showPassword ?
                                        <EyeInvisibleOutlined onClick={togglePasswordVisibility} /> :
                                        <EyeOutlined onClick={togglePasswordVisibility} />
                                }
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%', backgroundColor: '#8e44ad', borderColor: '#8e44ad' }} loading={loading}>
                                Iniciar sesión
                            </Button>
                        </Form.Item>
                    </Form>
                    <Text style={{ textAlign: 'center' }}>¿No tienes cuenta? <Link to="/registerOrganizer">Regístrate</Link></Text>
                </Card>
            </div>
        </div>
    );
};

export default OrganizerLogin;
