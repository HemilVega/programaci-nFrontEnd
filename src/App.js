import React, { useState, useEffect } from 'react';
import FormularioContacto from './FormularioContacto';
import ListaContactos from './ListaContactos';
import { Container, Row, Col, Form, FormControl, Navbar } from 'react-bootstrap';
import './App.css'; // Importa tu archivo CSS personalizado

function App() {
    const [contactos, setContactos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
    const [contactoEditando, setContactoEditando] = useState(null);

    useEffect(() => {
        const datosGuardados = JSON.parse(localStorage.getItem('contactos'));
        if (datosGuardados) {
            setContactos(datosGuardados);
        }
    }, []);

    useEffect(() => {
        setResultados(
            contactos.filter(contacto =>
                contacto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                contacto.email.toLowerCase().includes(busqueda.toLowerCase()) ||
                contacto.telefono.includes(busqueda)
            )
        );
    }, [busqueda, contactos]);

    const agregarContacto = (contacto) => {
        if (contactoEditando !== null) {
            const nuevosContactos = contactos.map((c, index) => 
                index === contactoEditando ? contacto : c
            );
            setContactos(nuevosContactos);
            localStorage.setItem('contactos', JSON.stringify(nuevosContactos));
            setContactoEditando(null);
        } else {
            const nuevosContactos = [...contactos, contacto];
            setContactos(nuevosContactos);
            localStorage.setItem('contactos', JSON.stringify(nuevosContactos));
        }
    };

    const eliminarContacto = (index) => {
        const nuevosContactos = contactos.filter((_, i) => i !== index);
        setContactos(nuevosContactos);
        localStorage.setItem('contactos', JSON.stringify(nuevosContactos));
    };

    const editarContacto = (index) => {
        setContactoEditando(index);
    };

    const setTheme = theme => document.documentElement.className = theme;

    return (
        <>
            <Navbar bg="dark" variant="dark" className="justify-content-center">
                <Navbar.Brand className="navbar-title">Directorio de Contactos</Navbar.Brand>
            </Navbar>
            <Container className="mt-4">
                <Row>
                    <Col md={6}>
                        <FormularioContacto 
                            agregarContacto={agregarContacto} 
                            contactoEditando={contactoEditando !== null ? contactos[contactoEditando] : null}
                        />
                    </Col>
                    <Col md={6}>
                        <Form className="mb-4">
                            <FormControl 
                                type="text" 
                                placeholder="Buscar..." 
                                value={busqueda} 
                                onChange={(e) => setBusqueda(e.target.value)} 
                            />
                        </Form>
                        <ListaContactos 
                            contactos={resultados} 
                            eliminarContacto={eliminarContacto} 
                            editarContacto={editarContacto} 
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default App;
