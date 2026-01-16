import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import ListarEmpleados from './pages/ListarEmpleado';
import RegistrarEmpleado from './pages/RegistrarEmpleado';
import Login from './pages/Login';
import { logout } from './api/auth'; // importa tu función


// 1. Componente de Protección (Guard)
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  
 

  const isAuth = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      {/* 3. Navbar Condicional: Solo se muestra si está logueado */}
      {isAuth && (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand as={Link} to="/">RRHH Pro</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Lista de Empleados</Nav.Link>
                <Nav.Link as={Link} to="/nuevo">Registrar Nuevo</Nav.Link>
              </Nav>
              <Button variant="outline-light" size="sm" onClick={logout}>
                Cerrar Sesión
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}

      <Container>
        <Routes>
          {/* Ruta Pública */}
          <Route path="/login" element={<Login />} />

          {/* Rutas Protegidas */}
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <ListarEmpleados />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/nuevo" 
            element={
              <PrivateRoute>
                <RegistrarEmpleado />
              </PrivateRoute>
            } 
          />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;