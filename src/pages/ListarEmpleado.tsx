import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../api/axiosConfig';

interface Empleado {
  rut: string;
  nombre: string;
  valorHora: number;
}

interface Liquidacion {
  sueldoBruto: number;
  descuentoAFP: number;
  descuentoSalud: number;
  sueldoLiquido: number;
}

const ListarEmpleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRut, setSelectedRut] = useState('');
  const [horas, setHoras] = useState(0);
  const [resultado, setResultado] = useState<Liquidacion | null>(null);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const res = await api.get('/empleados');
    setEmpleados(res.data);
  };

  const abrirCalculadora = (rut: string) => {
    setSelectedRut(rut);
    setResultado(null);
    setShowModal(true);
  };

  const handleCalcular = async () => {
    try {
      const res = await api.post(`/calcular/${selectedRut}/${horas}`);
      setResultado(res.data);
    } catch (error) {
      alert("Error al calcular el sueldo");
    }
  };

  const handleEliminar = async (rut: string) => {
    if (window.confirm("¿Está seguro de eliminar este empleado?")) {
      const res = await api.delete(`/empleados/${rut}`);
      alert(res.data); 
      cargarEmpleados();
    }
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Gestión de Personal</h2>
        <Button variant="outline-primary" onClick={cargarEmpleados}>Actualizar</Button>
      </div>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>RUT</th>
            <th>Nombre</th>
            <th>Valor Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map(emp => (
            <tr key={emp.rut}>
              <td>{emp.rut}</td>
              <td>{emp.nombre}</td>
              <td>${emp.valorHora.toLocaleString()}</td>
              <td>
                <Button variant="success" size="sm" className="me-2" onClick={() => abrirCalculadora(emp.rut)}>
                  Calcular Sueldo
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleEliminar(emp.rut)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para Cálculo de Remuneración */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cálculo de Remuneración</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Horas Trabajadas en el Mes</Form.Label>
            <Form.Control type="number" onChange={(e) => setHoras(Number(e.target.value))} />
          </Form.Group>

          {resultado && (
            <Alert variant="info" className="mt-3">
              <h5>Resultado de Liquidación</h5>
              <hr />
              <p>Sueldo Bruto: <strong>${resultado.sueldoBruto.toLocaleString()}</strong></p>
              <p>Descuento AFP (10%): -${resultado.descuentoAFP.toLocaleString()}</p>
              <p>Descuento Salud (7%): -${resultado.descuentoSalud.toLocaleString()}</p>
              <hr />
              <p className="h5">Sueldo Líquido: <strong>${resultado.sueldoLiquido.toLocaleString()}</strong></p>
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
                {resultado ? "Finalizar" : "Cerrar"}
            </Button>
            
            {/* El botón "Procesar Sueldo" solo se muestra si NO hay resultado */}
            {!resultado && (
                <Button variant="primary" onClick={handleCalcular}>
                Procesar Sueldo
                </Button>
            )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListarEmpleados;