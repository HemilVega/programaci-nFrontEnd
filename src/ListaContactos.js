import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

const coloresTarjetas = ['bg-primary', 'bg-success', 'bg-warning', 'bg-danger', 'bg-info'];

function ListaContactos({ contactos, eliminarContacto, editarContacto }) {
    return (
        <Row>
            {contactos.map((contacto, index) => (
                <Col key={index} xs={12} md={6} lg={4}>
                    <Card className={`mb-3 text-white ${coloresTarjetas[index % coloresTarjetas.length]}`}>
                        <Card.Body>
                            <Card.Title>{contacto.nombre}</Card.Title>
                            <Card.Text>
                                <p>{contacto.email}</p>
                                <p>{contacto.telefono}</p>
                            </Card.Text>
                            <Button 
                                variant="light" 
                                size="sm"
                                onClick={() => editarContacto(index)} 
                                className="mr-2"
                            >
                                Editar
                            </Button>
                            <Button 
                                variant="light" 
                                size="sm"
                                onClick={() => eliminarContacto(index)}
                                className="ml-2"
                            >
                                Eliminar
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default ListaContactos;
