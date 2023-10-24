"use client"; 
import {  Card } from "react-bootstrap";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Logo from "../../../public/Servihogar.png";
const Dashboard = () => {
  const{data:session} = useSession(); 
  return (
    <Card className="m-5 text-center">
    <Card.Body>
        <h4>Bienvenid@</h4>
        <Image
                  src={Logo}
                  width={100}
                  height={100}
                  alt="Imagen lotificacion"
                />
        <p><strong>{session?.user?.nombre}</strong></p>
        <p><strong>{session?.user?.idRol}</strong></p>
        <p><strong>{session?.user?.correo}</strong></p>
        <p><strong>{session?.user?.telefono}</strong></p>
    </Card.Body>
  </Card>
  )
}

export default Dashboard