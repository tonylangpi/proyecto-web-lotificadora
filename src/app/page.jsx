"use client";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
// import Image from "next/image";
// import Banner from "../../public/imageLanding.jpg";
import stylesP from "./formas.module.css";
const beneficios  = [ 
  {
    titulo: "Buen clima",
    imagen: 'https://parajesdemaza.com/images/buen-clima.jpg',
    description:"Contamos con un buen clima, rodeado de areas verdes y arboles que refrescan el ambiente"
  },
  {
    titulo:"Centrico",
    imagen:'https://parajesdemaza.com/images/ciudad.png',
    description:"Estamos a pocos  km del centro de la ciudad"
  },
  {
    titulo:"Rodeado de naturaleza",
    imagen:'https://parajesdemaza.com/images/naturaleza.png',
    description:"Contamos con vegetación boscosa que refresca tu vivienda"
  },
  {
    titulo:"Areas verdes y recreacion familiar",
    imagen:'https://parajesdemaza.com/images/areas-recreativas.jpg',
    description:"Hemos construido areas de recreación para que la pases bien con tu familia"
  }
]
export default function Home() {
  return (
    <>
      <main className={stylesP.heroSection}>
        <section className={stylesP.container}>
          <div className={stylesP.heroContent}>
            <div className={stylesP.heroText}>
              <h2 className={stylesP.heroWelcomeText}>¿Quienes somos?</h2>
              <h1 className={stylesP.heroCountry}>ServiHogar</h1>
              <p className={stylesP.heroTextDescription}>
                Somos una empresa que se dedica a la prestación de servicios
                inmobiliarios desde 1,996, con más de 8 proyectos desarrollados
                en Coatepeque, Quetzaltenango, somos la mejor opción para
                invertir y que tu sueño se haga realidad.
              </p>
            </div>
          </div>
        </section>
      </main>
      <section className={stylesP.beneficios}>
      <h5 className="text-center">BENEFICIOS</h5>
       {
        beneficios.map((bene, index) => {
          return(<div key={index} className={stylesP.tarjeta}>
          <div className={stylesP.tarjetaContent}>
             <img className={stylesP.image}  src={bene.imagen} alt="beneficios"/>
            <h5 className={stylesP.tarjetaTitle}>{bene.titulo}</h5>
            <p>{bene.description}</p>
          </div>
        </div>)
        })
       }
      </section>
    </>
  );
}
