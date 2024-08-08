import React from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams
import Navbar from '../../components/default_nav';

const UpdateEvent = () => {
    const { evento_id } = useParams(); 

    console.log('Evento ID:', evento_id);

    return (
        <div>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <h1>Este es el aparatado de Conócenos</h1>
                <p>[Diseño pendiente]</p>
            </div>
        </div>
    );
};

export default UpdateEvent;
