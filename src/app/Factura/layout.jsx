"use client";
import { Card, Nav } from "react-bootstrap";
import tabstyle from "./tabs.module.css";
import { useRouter } from "next/navigation";
import cx from 'classnames';
const LayoutFactura = ({ children }) => {
  const router = useRouter(); 
  return (
    <Card className="m-5">
      <Card.Header>
        <Nav variant="underline">
          <Nav.Item>
            <button className={tabstyle.Btn} onClick={()=>{router.push('/Factura')}}>
              <span>
                CONSULTAR FACTURA
              </span>
              <span></span>
            </button>
          </Nav.Item>
          <Nav.Item>
          <button className={tabstyle.Btn} onClick={()=>{router.push('/Factura/pagarFactura')}}>
              <span>
                PAGAR FACTURA
              </span>
              <span></span>
            </button>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default LayoutFactura;
