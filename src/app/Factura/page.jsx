"use client";
import {Form, Col, Row, Button} from 'react-bootstrap'; 

const handleSubmit = async (e) => {
  e.preventDefault();
  const FormDAta = new FormData(e.currentTarget);
  try {
    let vivienda = FormDAta.get("viviendaNumero");
    alert(vivienda); 
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      alert("datos no enviados")
    }
  }
};
const MiFactura = () => {
  return (
    <Form onSubmit={handleSubmit}>
       <h4>MI RECIBO DE MES GASTOS</h4>
      <Row className="align-items-center justify-content-center">
       <Col xs="auto">
        <Form.Label htmlFor="inlineFormInput" >
            Numero de vivienda o lote
          </Form.Label>
       </Col>
        <Col xs="auto">
          <Form.Control
            className="mb-2"
            id="inlineFormInput"
            placeholder="10-068"
            name="viviendaNumero"
          />
        </Col>
        <Col xs="auto">
          <Button type="submit" className="mb-2">
            Buscar
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default MiFactura