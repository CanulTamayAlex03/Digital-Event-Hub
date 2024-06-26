import React from 'react';
import { Card, Row, Col, message } from 'antd';
import Navbar from '../components/default_nav';

const plans = [
    {
        title: 'Plan básico',
        price: '$110',
        description: 'Podrás crear hasta 3 eventos, invitados ilimitados.',
        borderColor: '#E7E041' // Amarillo
    },
    {
        title: 'Plan estándar',
        price: '$190',
        description: 'Podrás crear hasta 7 eventos, invitados ilimitados, mantenimiento constante.',
        borderColor: '#3EC13B' // Verde
    },
    {
        title: 'Plan premium',
        price: '$250',
        description: 'Podrás crear hasta 11 eventos, invitados ilimitados, mantenimiento constante.',
        borderColor: '#3D7FE2' // Azul
    }
];

const handlePurchase = (plan) => {
    // Aquí puedes agregar la lógica de compra, como redirigir a una página de pago
    // o realizar una llamada a una API para procesar la compra.
    message.success(`Has seleccionado el ${plan.title} por ${plan.price} mxn`);
};

const Plans = () => (
    <div>
        <Navbar />
        <div style={{ padding: '20px', textAlign: 'center', fontSize: '25px' }}>
            <h1>¡Conoce nuestros planes!</h1>
        </div>

        <div style={{ padding: '5px' }}>
            <Row gutter={16} justify="center">
                {plans.map((plan, index) => (
                    <Col key={index} xs={24} sm={12} md={6} style={{ margin: '16px 0' }}>
                        <Card
                            style={{
                                borderRadius: '14px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                                borderTop: `14px solid ${plan.borderColor}`,
                                minHeight: '320px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                
                            }}
                        >
                            <p style={{ fontSize: '24px', fontFamily: 'Roboto', marginBottom: '40px', fontWeight: 'bold' }}>
                                {plan.title}
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <p style={{ fontSize: '20px', color: plan.borderColor, fontWeight: 'bold', }}>
                                    Mex
                                </p>
                                <p style={{ fontSize: '45px', color: plan.borderColor, fontWeight: 'bold', margin: '0 0 0 10px' }}>
                                    {plan.price}
                                </p>
                            </div>
                            
                            <p style={{ fontSize: '16px', fontFamily: 'Roboto', marginBottom: '60px' }}>
                                {plan.description}
                            </p>

                            <button
                                onClick={() => handlePurchase(plan)}
                                style={{
                                    backgroundColor: '#5D2678',
                                    color: 'white',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    width: '100%',
                                    height: '40px',
                                    fontFamily: 'Roboto',
                                    fontSize: '16px',
                                }}
                            >
                                Comprar
                            </button>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div style={{ marginTop: '50px', textAlign: 'center', fontFamily: 'Roboto', }}>
                <p>¿Tienes preguntas?</p>
                <p>Puedes contactarte a nuestros <a href="#https://ant.design/" style={{ color: '#6200ea' }}>Gerentes de cuenta</a></p>
            </div>
        </div>
    </div>
);

export default Plans;
