import React, { useEffect, useState } from 'react';
import { Card, List, Avatar, Typography, Spin } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import ClientNavbar from '../../components/client_nav';
import { apiConn } from '../config'

const { Title, Text } = Typography;

const ClientNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUserType = (usuario_id) => {
        switch (usuario_id) {
            case 1:
                return 'Administrador';
            case 2:
                return 'Organizador';
            case 3:
                return 'Cliente';
            default:
                return 'Desconocido';
        }
    };

    useEffect(() => {
        fetch(`${apiConn}/notification/getAll`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setNotifications(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <ClientNavbar />
            <div style={{ padding: '20px', background: '#f0f2f5' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Notificaciones</Title>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={notifications}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    hoverable
                                    style={{
                                        maxWidth: '500px',
                                        margin: '0 auto 20px',
                                        borderRadius: '10px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.2s',
                                    }}
                                    bodyStyle={{ padding: '20px' }}
                                    title={
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar icon={<NotificationOutlined />} style={{ marginRight: '10px' }} />
                                            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{getUserType(item.usuario_id)}</span>
                                        </div>
                                    }
                                    extra={<Text type="secondary">{new Date(item.fecha_envio).toLocaleDateString()}</Text>}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <Text style={{ fontSize: '14px', color: '#595959' }}>{item.mensaje}</Text>
                                </Card>
                            </List.Item>
                        )}
                    />
                )}
            </div>
        </div>
    );
};

export default ClientNotifications;
