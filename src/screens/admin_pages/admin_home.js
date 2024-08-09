import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Typography, Modal } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import OrganizerNavbar from '../../components/organizer_nav';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Importa el idioma español
const { Meta } = Card;
const { Title, Text } = Typography;

const AdminHome = () => {
    const [events, setEvents] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({});

    useEffect(() => {
        fetch('http://localhost:4000/api/event/get/pending')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy', { locale: es });
    };

    const handleInspect = (evento_id) => {
        console.log(`Inspeccionar evento con ID: ${evento_id}`);
    };

    const handleUpdateStatus = async (evento_id, estado) => {
        try {
            const response = await fetch('http://localhost:4000/api/event/post/pending', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ evento_id, estado }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el estado del evento');
            }

            // Actualizar la lista de eventos después de la aprobación o rechazo
            setEvents(events.filter(event => event.evento_id !== evento_id));
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error al actualizar el estado del evento:', error);
        }
    };

    const showModal = (evento_id, estado, evento_nombre) => {
        setModalContent({ evento_id, estado, evento_nombre });
        setIsModalVisible(true);
    };

    const handleOk = () => {
        handleUpdateStatus(modalContent.evento_id, modalContent.estado);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const renderEvents = (eventsList) => {
        return eventsList.map(event => (
            <Col span={24} key={event.evento_id} style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                <Card
                    hoverable
                    style={{ 
                        display: 'flex',
                        flexDirection: 'row',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: '#fff',
                        borderColor: '#e0e0e0',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        width: '760px',
                    }}
                    bodyStyle={{ display: 'flex', padding: '0' }}
                >
                    <img
                        alt="event"
                        src={event.imagen_url}
                        style={{ width: '330px', height: 'auto', objectFit: 'cover', borderRadius: '8px 0 0 8px' }}
                    />
                    <div style={{ padding: '16px', flex: 1 }}>
                        <Meta 
                            title={<Title level={4} style={{ color: '#4a148c', marginBottom: 0 }}>{event.evento_nombre}</Title>} 
                        />
                        <div style={{ marginTop: '10px' }}>
                            <Text style={{ display: 'block', color: '#4a148c' }}>
                                <CalendarOutlined style={{ marginRight: 8 }} />
                                Fecha de inicio: {formatDate(event.fecha_inicio)}
                            </Text>
                            <Text style={{ display: 'block', color: '#4a148c', marginTop: 4 }}>
                                <CalendarOutlined style={{ marginRight: 8 }} />
                                Fecha de término: {formatDate(event.fecha_termino)}
                            </Text>
                            <Text style={{ display: 'block', color: '#4a148c', marginTop: 4 }}>
                                <ClockCircleOutlined style={{ marginRight: 8 }} />
                                Hora: {event.hora}
                            </Text>
                            <Text style={{ display: 'block', color: '#4a148c', marginTop: 4 }}>
                                <EnvironmentOutlined style={{ marginRight: 8 }} />
                                Ubicación: {event.ubicacion}
                            </Text>
                            <Text style={{ display: 'block', color: '#4a148c', marginTop: 4 }}>
                                <UserOutlined style={{ marginRight: 8 }} />
                                Máximo de personas: {event.max_per}
                            </Text>
                        </div>
                        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-around' }}>
                            <Button 
                                type="primary" 
                                onClick={() => handleInspect(event.evento_id)}
                                style={{
                                    backgroundColor: '#14746f',
                                    borderColor: '#14746f',
                                    color: '#fff',
                                    marginRight: '8px'
                                }}
                            >
                                Inspeccionar
                            </Button>
                            <Button 
                                type="primary" 
                                onClick={() => showModal(event.evento_id, 'Aprobado', event.evento_nombre)}
                                style={{
                                    backgroundColor: '#0b2268',
                                    borderColor: '#0b2268',
                                    color: '#fff',
                                    marginRight: '8px'
                                }}
                            >
                                Aprobar
                            </Button>
                            <Button 
                                type="danger" 
                                onClick={() => showModal(event.evento_id, 'Rechazado', event.evento_nombre)}
                                style={{
                                    backgroundColor: '#81171b',
                                    borderColor: '#81171b',
                                    color: '#fff'
                                }}
                            >
                                Rechazar
                            </Button>
                        </div>
                    </div>
                </Card>
            </Col>
        ));
    };

    return (
        <div>
            <OrganizerNavbar />
            <div style={{ padding: '20px', paddingLeft: '65px', paddingRight: '65px'}}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Title level={2}>Administrador de eventos:</Title>
                </div>
                <Row gutter={[16, 16]}>
                    {renderEvents(events)}
                </Row>
            </div>
            <Modal
                title={`¿Estás seguro de que quieres ${modalContent.estado?.toLowerCase()} el evento?`}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirmar"
                cancelText="Cancelar"
            >
                <p>{`Nombre de evento: ${modalContent.evento_nombre}`}</p>
            </Modal>
        </div>
    );
};

export default AdminHome;
