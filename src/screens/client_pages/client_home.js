import React, { useEffect, useState, useRef } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import ClientNavbar from '../../components/client_nav';

const ClientHome = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [categories, setCategories] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedEventType, setSelectedEventType] = useState('');

    const filterRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:4000/api/event/get/approved')
            .then(response => response.json())
            .then(data => {
                console.log('Datos de eventos:', data);
                setEvents(data);
                setFilteredEvents(data);
                const uniqueCategories = [...new Set(data.map(event => event.categoria))];
                const uniqueEventTypes = [...new Set(data.map(event => event.tipo_evento))];
                setCategories(uniqueCategories);
                setEventTypes(uniqueEventTypes);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const applyFilters = () => {
        setFilteredEvents(
            events.filter(event =>
                event.evento_nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedCategory ? event.categoria === selectedCategory : true) &&
                (selectedEventType ? event.tipo_evento === selectedEventType : true)
            )
        );
    };

    useEffect(() => {
        applyFilters();
    }, [searchTerm, selectedCategory, selectedEventType, events]);

    const toggleFilters = () => {
        setShowFilters(prevState => !prevState);
    };

    return (
        <div>
            <ClientNavbar />
            <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Eventos Disponibles</h1>
                
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', position: 'relative' }}>
                    <div style={{ flex: '1 1 auto', maxWidth: '600px', position: 'relative' }}>
                        <input 
                            type="text" 
                            placeholder="Buscar eventos..." 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{
                                width: 'calc(100% - 60px)', 
                                padding: '10px 20px',
                                borderRadius: '25px',
                                border: '1px solid #ccc',
                                outline: 'none',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                marginRight: '10px'
                            }}
                        />
                        <FaSearch 
                            style={{ 
                                position: 'absolute', 
                                top: '50%', 
                                right: '10px', 
                                transform: 'translateY(-50%)', 
                                color: '#aaa' 
                            }}
                        />
                    </div>
                    <button 
                        onClick={toggleFilters}
                        style={{
                            padding: '10px 15px',
                            borderRadius: '25px',
                            border: '1px solid #ccc',
                            backgroundColor: 'white',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '10px'
                        }}
                    >
                        <FaFilter style={{ marginRight: '5px', color: '#007bff' }} />
                        Filtrar
                    </button>

                    {/* Filtros Desplegables */}
                    {showFilters && (
                        <div 
                            ref={filterRef}
                            style={{
                                position: 'absolute',
                                top: '100%',
                                right: '0',
                                backgroundColor: 'white',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                padding: '10px',
                                width: '250px',
                                zIndex: 1000,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}
                        >
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Categoría</label>
                                <select 
                                    value={selectedCategory}
                                    onChange={e => setSelectedCategory(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="">Todas las categorías</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Tipo de Evento</label>
                                <select 
                                    value={selectedEventType}
                                    onChange={e => setSelectedEventType(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="">Todos los tipos</option>
                                    {eventTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
                            <div 
                                key={event.evento_id} 
                                style={{ 
                                    border: '1px solid #ccc', 
                                    borderRadius: '8px', 
                                    padding: '16px', 
                                    maxWidth: '300px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                    textAlign: 'center',
                                    backgroundColor: 'white'
                                }}
                            >
                                <img 
                                    src={event.imagen_url} 
                                    alt={event.evento_nombre} 
                                    style={{ 
                                        width: '100%', 
                                        height: '200px', 
                                        objectFit: 'cover', 
                                        borderRadius: '8px' 
                                    }}
                                />
                                <h3 style={{ margin: '10px 0' }}>{event.evento_nombre}</h3>
                                <p><strong>Ubicación:</strong> {event.ubicacion}</p>
                                <p><strong>Inicia:</strong> {new Date(event.fecha_inicio).toLocaleDateString()}</p>
                                <p><strong>Termina:</strong> {new Date(event.fecha_termino).toLocaleDateString()}</p>
                                <p><strong>Hora:</strong> {event.hora}</p>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', width: '100%' }}>No se encontraron eventos.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientHome;
