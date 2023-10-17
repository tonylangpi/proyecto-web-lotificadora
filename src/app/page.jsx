"use client";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Image from "next/image";
import Banner from "../../public/imageLanding.jpg";
import stylesP from './formas.module.css'
export default function Home() {

  return (
    <>
<main className={stylesP.heroSection}>
  <section className={stylesP.container}>
    <div className={stylesP.heroContent}>
      <div className={stylesP.heroText}>
        <h2 className={stylesP.heroWelcomeText}>¿Quienes somos?</h2>
        <h1 className={stylesP.heroCountry}>Parajes de Maza</h1>
        <p className={stylesP.heroTextDescription}>Somos una empresa que se dedica a la prestación de servicios inmobiliarios desde 1,996, con más de 8 proyectos desarrollados en Coatepeque, Quetzaltenango, somos la mejor opción para invertir y que tu sueño se haga realidad.</p>
      </div>
    </div>
  </section>
</main>
    </>
  );
}
