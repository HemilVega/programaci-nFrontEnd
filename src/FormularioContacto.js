import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function FormularioContacto({ agregarContacto, contactoEditando }) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (contactoEditando) {
            setNombre(contactoEditando.nombre);
            setEmail(contactoEditando.email);
            setTelefono(contactoEditando.telefono);
        } else {
            setNombre('');
            setEmail('');
            setTelefono('');
        }
    }, [contactoEditando]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre || !email || !telefono) {
            setError('Todos los campos son obligatorios');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Correo electrónico no es válido');
            return;
        }
        const telefonoRegex = /^[0-9]+$/;
        if (!telefonoRegex.test(telefono)) {
            setError('Número de teléfono no es válido');
            return;
        }
        agregarContacto({ nombre, email, telefono });
        setNombre('');
        setEmail('');
        setTelefono('');
        setError('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </Form.Group>
            <Form.Group controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control 
                    type="tel" 
                    value={telefono} 
                    onChange={(e) => setTelefono(e.target.value)} 
                />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit" className="mt-3">
                {contactoEditando ? 'Actualizar Contacto' : 'Guardar Contacto'}
            </Button>
        </Form>
    );
}

export default FormularioContacto;
