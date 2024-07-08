import React from 'react';
import { Card, Row, Col } from 'antd';
import ClientNavbar from '../../components/client_nav';

const { Meta } = Card;

const cardData = [
    {
        title: 'Evento de Astronomia, obten tus boletos y no te pierdas esta maravillosa experiencia',
        image: 'https://images.pexels.com/photos/2901134/pexels-photo-2901134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        title: 'Festival del día de muertos, obten tus boletos gratis',
        image: 'https://as2.ftcdn.net/v2/jpg/05/37/14/87/1000_F_537148724_5MlAA5u5wcztKvp5cf1jcsbqeCN1irJs.jpg',
    },
    {
        title: 'Asiste a la conferencia sobre React',
        image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
];

const ClientHome = () => (
    <div>
        <ClientNavbar />
        <div style={{ padding: '20px' }}>
            <h1>Home del cliente</h1>
            <Row gutter={16}>
                {cardData.map((card, index) => (
                    <Col key={index} span={8}>
                        <Card
                            hoverable
                            cover={<img alt={card.title} src={card.image} />}
                            style={{ marginBottom: '20px' }}
                        >
                            <Meta title={card.title} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    </div>
);

export default ClientHome;
