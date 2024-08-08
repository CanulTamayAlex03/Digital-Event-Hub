import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/default_nav';
import { Form, Input, DatePicker, TimePicker, Button, Card, Select, InputNumber, Row, Col, notification } from 'antd';

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

const UpdateEvent = () => {
    const { evento_id } = useParams();
    const [form] = Form.useForm();


    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/events/get/img/${evento_id}`);
                const data = await response.json();
                console.log(data.tipo_evento);
                form.setFieldsValue({
                    nombre: data.evento_nombre,
                    // fecha_inicio: data.fecha_inicio ? DatePicker.parse(data.fecha_inicio, 'YYYY-MM-DD') : null,
                    // fecha_termino: data.fecha_termino ? DatePicker.parse(data.fecha_termino, 'YYYY-MM-DD') : null,
                    // hora: data.hora ? TimePicker.parse(data.hora, 'HH:mm') : null,
                    tipo_evento_id: data.tipo_evento,
                    categoria_id: data.categoria,
                    ubicacion: data.ubicacion,
                    max_per: data.max_per,
                    monto: data.monto,
                    escenario: data.forma_escenario,
                    descripcion: data.descripcion,
                });
            } catch (error) {
                console.error('Error al obtener los datos del evento:', error);
                notification.error({
                    message: 'Error',
                    description: 'No se pudieron cargar los datos del evento.',
                });
            }
        };

        fetchEventData();
    }, [evento_id, form]);

    const handleSubmit = async (values) => {
        let imagen_url;

        switch (values.categoria_id) {
            case 1:
                imagen_url = 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
                break;
            case 2:
                imagen_url = 'https://images.pexels.com/photos/768125/pexels-photo-768125.jpeg?auto=compress&cs=tinysrgb&w=600';
                break;
            case 3:
                imagen_url = 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600';
                break;
            case 4:
                imagen_url = 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600';
                break;
            default:
                imagen_url = 'https://images.pexels.com/photos/7897470/pexels-photo-7897470.jpeg?auto=compress&cs=tinysrgb&w=600';

        }

        const formattedValues = {
            nombre: values.nombre,
            fecha_inicio: values.fecha_inicio.format('YYYY-MM-DD'),
            fecha_termino: values.fecha_termino.format('YYYY-MM-DD'),
            hora: values.hora.format('HH:mm'),
            tipo_evento_id: values.tipo_evento_id,
            categoria_id: values.categoria_id,
            ubicacion: values.ubicacion,
            max_per: values.max_per,
            imagen_url: imagen_url,
            monto: values.monto,
            forma: values.escenario,
            descripcion: values.descripcion
        };

        try {
            const response = await fetch(`http://localhost:4000/api/events/put/img/${evento_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedValues),
            });

            const contentType = response.headers.get('content-type');
            const data = contentType && contentType.includes('application/json') ? await response.json() : await response.text();

            if (response.ok) {
                notification.success({
                    message: 'Éxito',
                    description: typeof data === 'string' ? data : 'El evento se ha creado correctamente.',
                });
                window.location.href = '/homeOrganizer';
            } else {
                throw new Error(data.message || data || 'Error al crear el evento');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            notification.error({
                message: 'Error',
                description: error.message || 'Ocurrió un error al enviar los datos.',
            });
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
                <Card style={{ borderRadius: '8px', border: '2px solid #6D238B', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h1 style={{ color: '#6D238B', textAlign: 'center' }}>Actualizar Evento</h1>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Item label="Nombre" name="nombre" >
                                    <Input />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="Ubicación" name="ubicacion">
                                    <Input />
                                </Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Item label="Fecha de Inicio" name="fecha_inicio">
                                    <DatePicker style={{ width: '100%' }} />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="Fecha de Término" name="fecha_termino">
                                    <DatePicker style={{ width: '100%' }} />
                                </Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Item label="Hora" name="hora">
                                    <TimePicker style={{ width: '100%' }} format="HH:mm" />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="Máximo de personas" name="max_per">
                                    <InputNumber min={1} style={{ width: '100%' }} />
                                </Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Item label="Tipo de Evento" name="tipo_evento_id" >
                                    <Select placeholder="Seleccionar tipo de evento">
                                        <Option value={1}>Público</Option>
                                        <Option value={2}>Privado</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="Categoría" name="categoria_id">
                                    <Select placeholder="Seleccionar categoría">
                                        <Option value={1}>Tecnología</Option>
                                        <Option value={2}>Educación</Option>
                                        <Option value={3}>Entretenimiento</Option>
                                        <Option value={4}>Deportes</Option>
                                    </Select>
                                </Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Item label="Escenario" name="escenario">
                                    <Select>
                                        <Option value={'Redondo'}>Redondo</Option>
                                        <Option value={'Cuadrado'}>Cuadrado</Option>
                                        <Option value={'Triangulo'}>Triangulo</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="Monto" name="monto">
                                    <InputNumber min={0} style={{ width: '100%' }} />
                                </Item>
                            </Col>
                        </Row>
                        <Item label="Descripcion" name="descripcion">
                            <TextArea rows={4} placeholder="" />
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%', background: '#6D238B', borderColor: '#6D238B' }}>
                                ACTUALIZAR EVENTO
                            </Button>
                        </Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default UpdateEvent;
