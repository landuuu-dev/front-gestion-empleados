import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const RegistrarEmpleado = () => {
  const navigate = useNavigate();

  // IMPORTANTE: Los nombres aquí deben ser IDÉNTICOS a los de tu entidad Java
  const [empleado, setEmpleado] = useState({ 
    rut: '',            // Antes decía rutEmpleado, debe ser 'rut'
    nombre: '', 
    valorHora: 0, 
    valorHoraExtra: 0,
    direccion: '', 
    telefono: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Al enviar 'empleado', el JSON llevará la llave "rut"
      await api.post('/empleados', empleado);
      alert("¡Empleado registrado con éxito!");
      navigate('/'); 
    } catch (error: any) {
      console.error("Error del servidor:", error.response?.data);
      // Esto te dirá exactamente qué campo está fallando si el error persiste
      const mensajeError = error.response?.data?.message || "Error al conectar con el servidor";
      alert("Error al registrar: " + mensajeError);
    }
  };

  return (
    <Card className="shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
      <Card.Body>
        <Card.Title className="mb-4 text-center">Registrar Nuevo Empleado</Card.Title>
        <Form onSubmit={handleSubmit}>
          
          <Form.Group className="mb-3">
            <Form.Label>RUT</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="12345678-9" 
              required
              value={empleado.rut}
              onChange={e => setEmpleado({...empleado, rut: e.target.value})} 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Ej: Juan Pérez" 
              required
              value={empleado.nombre}
              onChange={e => setEmpleado({...empleado, nombre: e.target.value})} 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Valor Hora ($)</Form.Label>
            <Form.Control 
              type="number" 
              min="1"
              required
              value={empleado.valorHora}
              onChange={e => setEmpleado({...empleado, valorHora: Number(e.target.value)})} 
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">Guardar Empleado</Button>
            <Button variant="outline-secondary" onClick={() => navigate('/')}>
              Cancelar
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RegistrarEmpleado;