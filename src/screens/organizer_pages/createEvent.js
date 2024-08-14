
import React, { useState } from 'react';
import { Form, Input, DatePicker, TimePicker, Button, Card, Select, InputNumber, Row, Col, notification, Modal, Radio } from 'antd';
import Navbar from '../../components/default_nav';
import { apiConn } from '../config'

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

const CreateEvent = () => {
    const [loading, setLoading] = useState(false);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [customImageUrl, setCustomImageUrl] = useState('');

    const handleImageSelection = (e) => {
        setSelectedImage(e.target.value);
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        // Guardamos los calores del form en variables 
        const maxPer = values.max_per;
        const formaEscenario = values.escenario;

        let imagen_url = selectedImage;
        if (selectedImage === 'custom') {
            imagen_url = customImageUrl;
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
            descripcion: values.descripcion,
        };

        try {
            const response = await fetch(`${apiConn}/events/post/img`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedValues),
            });

            const contentType = response.headers.get('content-type');
            const data = contentType && contentType.includes('application/json') ? await response.json() : await response.text();

            if (response.ok) {
                const evento_id = data.evento_id;

                // Aqui hago el POST para crear el escenario
                const escenarioResponse = await fetch(`${apiConn}/escenarios`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        asiento: maxPer,
                        forma: formaEscenario,
                        evento_id: evento_id,
                    }),
                });
                const escenarioData = await escenarioResponse.json();

                if (escenarioResponse.ok) {
                    notification.success({
                        message: 'Éxito',
                        description: 'El evento y el escenario se han creado correctamente.',
                    });
                    window.location.href = '/homeOrganizer';
                } else {
                    throw new Error(escenarioData.message || 'Error al crear el escenario');
                }
            } else {
                throw new Error(data.message || data || 'Error al crear el evento');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            notification.error({
                message: 'Error',
                description: error.message || 'Ocurrió un error al enviar los datos.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
                <Card style={{ borderRadius: '8px', border: '2px solid #6D238B', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h1 style={{ color: '#6D238B', textAlign: 'center' }}>Crear Evento</h1>
                    <Form layout="vertical" onFinish={handleSubmit}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Por favor ingrese el nombre del evento' }]}>
                                    <Input />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="Ubicación" name="ubicacion" rules={[{ required: true, message: 'Por favor ingrese la ubicación' }]}>
                                    <Input />
                                </Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Item label="Fecha de Inicio" name="fecha_inicio" rules={[{ required: true, message: 'Por favor seleccione la fecha de inicio' }]}>
                                    <DatePicker style={{ width: '100%' }} />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="Fecha de Término" name="fecha_termino" rules={[{ required: true, message: 'Por favor seleccione la fecha de término' }]}>
                                    <DatePicker style={{ width: '100%' }} />
                                </Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Item label="Hora" name="hora" rules={[{ required: true, message: 'Por favor seleccione la hora' }]}>
                                    <TimePicker style={{ width: '100%' }} format="HH:mm" />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="Máximo de personas" name="max_per" rules={[{ required: true, message: 'Por favor ingrese el número máximo de personas' }]}>
                                    <InputNumber min={1} style={{ width: '100%' }} />
                                </Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Item label="Tipo de Evento" name="tipo_evento_id" rules={[{ required: true, message: 'Por favor seleccione el tipo de evento' }]}>
                                    <Select placeholder="Seleccionar tipo de evento">
                                        <Option value={1}>Público</Option>
                                        <Option value={2}>Privado</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="Categoría" name="categoria_id" rules={[{ required: true, message: 'Por favor seleccione la categoría' }]}>
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
                                <Item label="Escenario" name="escenario" rules={[{ required: true, message: 'Por favor seleccione un tipo de escenario' }]}>
                                    <Select>
                                        <Option value={'Redondo'}>Redondo</Option>
                                        <Option value={'Cuadrado'}>Cuadrado</Option>
                                        <Option value={'Triangular'}>Triangular</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item
                                    label="Monto"
                                    name="monto"
                                    rules={[{ required: true, message: 'Por favor ingrese el monto' }]}
                                >
                                    <InputNumber
                                        min={0}
                                        addonBefore="MXN"
                                        style={{ width: '100%' }}
                                    />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="Imagen" rules={[{ required: true, message: 'Por favor seleccione una imagen' }]}>
                                    <Button onClick={() => setImageModalVisible(true)}>
                                        Seleccionar Imagen
                                    </Button>
                                </Item>
                            </Col>
                        </Row>

                        {/* Modal para seleccionar la imagen */}
                        <Modal
                            title="Seleccionar Imagen"
                            visible={imageModalVisible}
                            onOk={() => setImageModalVisible(false)}
                            onCancel={() => setImageModalVisible(false)}
                        >
                            <Radio.Group onChange={handleImageSelection} value={selectedImage}>
                                <Radio value="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">Tecnología</Radio>
                                <Radio value="https://images.pexels.com/photos/768125/pexels-photo-768125.jpeg?auto=compress&cs=tinysrgb&w=600">Educación</Radio>
                                <Radio value="https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600">Entretenimiento</Radio>
                                <Radio value="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600">Deportes</Radio>
                                <Radio value="custom">
                                    <Input
                                        placeholder="URL Imagen personalizada"
                                        onChange={(e) => setCustomImageUrl(e.target.value)}
                                        disabled={selectedImage !== 'custom'}
                                        style={{ width: '100%' }}
                                    />

                                </Radio>
                            </Radio.Group>
                        </Modal>
                        <Item label="Descripcion" name="descripcion" rules={[{ required: true, message: 'Por favor ingrese un comentario' }]}>
                            <TextArea rows={4} placeholder="" />
                        </Item>
                        <Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: '100%', background: '#6D238B', borderColor: '#6D238B' }}
                                loading={loading}
                            >
                                CREAR EVENTO
                            </Button>
                        </Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default CreateEvent;
