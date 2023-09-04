'use client';
import {Card, Nav} from 'react-bootstrap';
const LayoutFactura = ({children}) => {
  return (
    <Card className='mt-5'>
      <Card.Header>
         CONOCER MI FACTURA DEL MES SEGUN VIVIENDA NUMERO
      </Card.Header>
      <Card.Body>
          {children}
      </Card.Body>
    </Card>
  )
}

export default LayoutFactura