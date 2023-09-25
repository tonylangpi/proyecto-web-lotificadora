'use client';
import {Card, Nav} from 'react-bootstrap';
const LayoutPropiedades = ({children}) => {
  return (
    <Card className='m-5'>
      <Card.Header>
         MANEJO DE PROPIETARIOS Y VIVIENDAS
      </Card.Header>
      <Card.Body>
          {children}
      </Card.Body>
    </Card>
  )
}

export default LayoutPropiedades;