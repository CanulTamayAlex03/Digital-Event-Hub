import React from 'react';
import Navbar from '../components/default_nav';

const DefaultHome = () => (
  <div>
    <Navbar />
    <div style={{ padding: '20px' }}>
      <h1>Este es el apartado del home por defecto</h1>
      <p>sin haber iniciado sesión</p>
    </div>
  </div>
);

export default DefaultHome;
