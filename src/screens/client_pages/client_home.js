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
            <div style={{ padding: '30px',marginTop: '30px', maxWidth: '80%', margin: 'auto', backgroundColor: '#f7f8fa', borderRadius: '8px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontSize: '2em', fontWeight: 'bold' }}>Eventos Digital Event Hub:</h1>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', position: 'relative' }}>
                    <div style={{ flex: '1 1 auto', maxWidth: '600px', position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Buscar eventos..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{
                                width: 'calc(100% - 60px)',
                                padding: '12px 20px',
                                borderRadius: '30px',
                                border: '1px solid #ddd',
                                outline: 'none',
                                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                                marginRight: '10px',
                                fontSize: '1em'
                            }}
                        />
                        <FaSearch
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '40px',
                                transform: 'translateY(-50%)',
                                color: '#6D3089',
                                fontSize: '1.2em'
                            }}
                        />
                    </div>
                    <button
                        onClick={toggleFilters}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '25px',
                            border: 'none',
                            backgroundColor: '#6D3089',
                            color: 'white',
                            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '10px',
                            fontSize: '1em'
                        }}
                    >
                        <FaFilter style={{ marginRight: '5px', fontSize: '1.2em' }} />
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
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                                padding: '15px',
                                width: '250px',
                                zIndex: 1000,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Categoría</label>
                                <select
                                    value={selectedCategory}
                                    onChange={e => setSelectedCategory(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                        outline: 'none',
                                        fontSize: '1em'
                                    }}
                                >
                                    <option value="">Todas las categorías</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tipo de Evento</label>
                                <select
                                    value={selectedEventType}
                                    onChange={e => setSelectedEventType(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                        outline: 'none',
                                        fontSize: '1em'
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
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    maxWidth: '300px',
                                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                                    textAlign: 'center',
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
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
                                <h3 style={{ margin: '10px 0', fontSize: '1.5em', color: '#333' }}>{event.evento_nombre}</h3>
                                <p><strong>Ubicación:</strong> {event.ubicacion}</p>
                                <p><strong>Inicia:</strong> {new Date(event.fecha_inicio).toLocaleDateString()}</p>
                                <p><strong>Termina:</strong> {new Date(event.fecha_termino).toLocaleDateString()}</p>
                                <p><strong>Hora:</strong> {event.hora}</p>
                                <button
                                    style={{
                                        marginTop: '10px',
                                        padding: '10px 15px',
                                        borderRadius: '25px',
                                        border: 'none',
                                        backgroundColor: '#6D3089',
                                        color: 'white',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                                    }}
                                >
                                    Ver detalles
                                </button>
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
