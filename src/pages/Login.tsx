import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';

const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Validamos contra las mismas credenciales que pusimos en el Backend
    if (user === 'administradorAutorizado' && pass === 'password12390-p') {
      localStorage.setItem('isAuthenticated', 'true'); // Sesión iniciada
      navigate('/'); // Redirigir al panel principal
    } else {
      setError(true);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '400px' }} className="shadow border-0">
        <Card.Body className="p-5">
          <h2 className="text-center mb-4">RRHH Login</h2>
          {error && <Alert variant="danger">Credenciales Incorrectas</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" onChange={(e) => setUser(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" onChange={(e) => setPass(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 py-2">
              Ingresar al Sistema
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;