"use client";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Image from "next/image";
import Banner from "../../public/imageLanding.jpg";
export default function Home() {
  return (
    <>
      <div className="card">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <Image
                src={Banner}
                width={500}
                height={350}
                alt="Imagen lotificacion"
                priority={true}
              />
            </div>
            <div className="col-md-6 align-items-center">
              <h2>¿Quienes somos?</h2>
              <p>
              Somos una empresa que se dedica a la prestación de servicios inmobiliarios desde 1,996, con más de 8 proyectos desarrollados en Coatepeque, Quetzaltenango, somos la mejor opción para invertir y que tu sueño se haga realidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
