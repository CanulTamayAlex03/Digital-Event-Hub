import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, message } from 'antd';
import OrganizerNavbar from '../../components/organizer_nav';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Importa el idioma español

const { Meta } = Card;

const OrganizerHome = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/event/get/img')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleDelete = (evento_id) => {
        fetch('http://localhost:4000/api/event/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ evento_id })
        })
        .then(response => {
            if (response.ok) {
                setEvents(events.filter(event => event.evento_id !== evento_id));
                message.success('Evento eliminado exitosamente');
            } else {
                message.error('Error al eliminar el evento');
            }
        })
        .catch(error => {
            console.error('Error deleting event:', error);
            message.error('Error al eliminar el evento');
        });
    };

    const handleEdit = (evento_id) => {
        console.log(`Editar evento con ID: ${evento_id}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy', { locale: es });
    };

    return (
        <div>
            <OrganizerNavbar />
            <div style={{ padding: '20px' }}>
                <h1>Home del organizador</h1>
                <Row gutter={[16, 16]}>
                    {events.map(event => (
                        <Col span={4} key={event.evento_id} style={{ marginBottom: '16px' }}>
                            <Card
                                hoverable
                                cover={<img alt="event" src={event.imagen_url} style={{ width: '100%', borderRadius: '8px' }} />}
                                actions={[
                                    <Button type="primary" size="small" onClick={() => handleEdit(event.evento_id)}>Editar</Button>,
                                    <Button type="danger" size="small" onClick={() => handleDelete(event.evento_id)}>Eliminar</Button>
                                ]}
                                style={{ 
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    backgroundColor: '#f5f5f5',
                                    color: '#4a148c',
                                    borderColor: '#4a148c',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                }}
                                bodyStyle={{ padding: '16px' }}
                            >
                                <Meta 
                                    title={event.nombre} 
                                    style={{ color: '#4a148c' }} 
                                />
                                <p style={{ color: '#4a148c' }}>Fecha de inicio: {formatDate(event.fecha_inicio)}</p>
                                <p style={{ color: '#4a148c' }}>Fecha de término: {formatDate(event.fecha_termino)}</p>
                                <p style={{ color: '#4a148c' }}>Hora: {event.hora}</p>
                                <p style={{ color: '#4a148c' }}>Ubicación: {event.ubicacion}</p>
                                <p style={{ color: '#4a148c' }}>Máximo de personas: {event.max_per}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default OrganizerHome;
