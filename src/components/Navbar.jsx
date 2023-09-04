import { Navbar, Nav, Button, Container } from "react-bootstrap";
import Image from "next/image";
import Link from 'next/link';
import Logo from "../../public/logomaza.jpg";
const Navegador = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid className="p-1">
          <Navbar.Brand href="/">
            <Image
              src={Logo}
              width={100}
              height={100}
              alt="Picture of the author"
            />
            LOTIFICADORA EL AMANECER
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Button variant="outline-light p-3">Iniciar Sesión</Button>
          </Nav>
        </Container>
      </Navbar>
      <Nav
        fill
        variant="tabs"
        defaultActiveKey="#"
        className="bg-success bg-gradient  pt-3"
      >
        <Nav.Item>
          <Nav.Link as={Link} href="/About" className="text-dark">
            Acerca de nostros
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} href="/Factura" eventKey="link-2" className="text-dark">
            Mi Factura
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3" className="text-dark">
            Actualizar datos
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Navegador;
