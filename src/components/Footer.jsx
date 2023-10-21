"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import StylesFooter from "./footer.module.css";
import Link from "next/link";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import Logo from '../../public/Servihogar.png';
const Footer = () => {
  const { status } = useSession();
  return (() => {
    switch (status) {
      case "authenticated": //si el usuario esta autenticado retorna el dashboard
        return (
          <footer className="footer bg-dark text-white fixed-bottom text-align-center">
            BIENVENIDO SISTEMAS LANGPI
          </footer>
        );
      case "loading":
        return (
          <footer className={StylesFooter.mainFooter}>
            <div className={StylesFooter.contenedor}>
              <div className={StylesFooter.column5025}>
              <Image src={Logo} width={150} height={150} alt="Imagen lotificacion" />
                <p className={StylesFooter.footerTxt}>
                  Buscamos que vivas tranquilamente con tu familia
                </p>
              </div>
              <div className={StylesFooter.column5025}>
                <h2 className={StylesFooter.footerTitle}>Links</h2>
                <nav class="navbar navbar-expand-lg bg-body-dark">
                  <div class="container-fluid">
                    <button
                      class="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNavAltMarkup"
                      aria-controls="navbarNavAltMarkup"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div
                      class="collapse navbar-collapse"
                      id="navbarNavAltMarkup"
                    >
                      <div class="navbar-nav">
                        <Link class="nav-link text-light" aria-current="page" href="/">
                          INICIO
                        </Link>
                        <Link class="nav-link text-light" href="/Factura">
                          Mi recibo
                        </Link>
                        <Link class="nav-link text-light" href="/About">
                          Contacto
                        </Link>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              <div className={StylesFooter.column5025}>
                <h2 className={StylesFooter.footerTitle}>Redes sociales</h2>
                <p>Encuentranos en:</p>
                <div className={StylesFooter.socialIcon}>
                 <Link target="blank" href="https://www.facebook.com/ParajesdeMazaGt">
                  <FacebookIcon/>
                 </Link>
                 <Link target="blank" href="https://www.youtube.com/channel/UC5B9AbTL1PL_9wBTQ7TCq2A">
                  <YouTubeIcon/>
                 </Link>
                 <Link target="blank" href="https://www.instagram.com/parajesdemaza/">
                  <InstagramIcon/>
                 </Link>
                </div>
              </div>
              <div className={StylesFooter.column5025}>
                <h2 className={StylesFooter.footerTitle}>Contacto</h2>
                <div className={StylesFooter.contactIcon}>
                  <ApartmentIcon/>
                  <p className="contact__txt">Lotificadora Maza</p>
                </div>
                <div className={StylesFooter.contactIcon}>
                  <LocalPhoneIcon/>
                  <p className="contact__txt">4770 9241</p>
                </div>
                <div className={StylesFooter.contactIcon}>
                  <EmailIcon/>
                  <p className="contact__txt">info@parajesdemaza.com</p>
                </div>
              </div>
            </div>
            <p className={StylesFooter.copy}>
              © 2023 Lotificadora. All Rights Reserved | Design by{" "}
              <span className="color-span">LANGPI</span>
            </p>
          </footer>
        );
      case "unauthenticated":
        return (
          <footer className={StylesFooter.mainFooter}>
            <div className={StylesFooter.contenedor}>
              <div className={StylesFooter.column5025}>
              <Image src={Logo} width={150} height={150} alt="Imagen lotificacion" />
                <p className={StylesFooter.footerTxt}>
                  Buscamos que vivas tranquilamente con tu familia
                </p>
              </div>
              <div className={StylesFooter.column5025}>
                <h2 className={StylesFooter.footerTitle}>Links</h2>
                <nav class="navbar navbar-expand-lg bg-body-dark">
                  <div class="container-fluid">
                    <button
                      class="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNavAltMarkup"
                      aria-controls="navbarNavAltMarkup"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div
                      class="collapse navbar-collapse"
                      id="navbarNavAltMarkup"
                    >
                      <div class="navbar-nav">
                        <Link class="nav-link text-light" aria-current="page" href="/">
                          INICIO
                        </Link>
                        <Link class="nav-link text-light" href="/Factura">
                          Mi recibo
                        </Link>
                        <Link class="nav-link text-light" href="/About">
                          Contacto
                        </Link>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              <div className={StylesFooter.column5025}>
                <h2 className={StylesFooter.footerTitle}>Redes sociales</h2>
                <p>Encuentranos en:</p>
                <div className={StylesFooter.socialIcon}>
                 <Link target="blank" href="https://www.facebook.com/ParajesdeMazaGt">
                  <FacebookIcon/>
                 </Link>
                 <Link target="blank" href="https://www.youtube.com/channel/UC5B9AbTL1PL_9wBTQ7TCq2A">
                  <YouTubeIcon/>
                 </Link>
                 <Link target="blank" href="https://www.instagram.com/parajesdemaza/">
                  <InstagramIcon/>
                 </Link>
                </div>
              </div>
              <div className={StylesFooter.column5025}>
                <h2 className={StylesFooter.footerTitle}>Contacto</h2>
                <div className={StylesFooter.contactIcon}>
                  <ApartmentIcon/>
                  <p className="contact__txt">Lotificadora Maza</p>
                </div>
                <div className={StylesFooter.contactIcon}>
                  <LocalPhoneIcon/>
                  <p className="contact__txt">4770 9241</p>
                </div>
                <div className={StylesFooter.contactIcon}>
                  <EmailIcon/>
                  <p className="contact__txt">info@parajesdemaza.com</p>
                </div>
              </div>
            </div>
            <p className={StylesFooter.copy}>
              © 2023 Lotificadora. All Rights Reserved | Design by{" "}
              <span className="color-span">LANGPI</span>
            </p>
          </footer>
        );
      default:
        return (
          <footer className={StylesFooter.mainFooter}>
            <div className={StylesFooter.contenedor}>
              <div className={StylesFooter.column5025}>
              <Image src={Logo} width={150} height={150} alt="Imagen lotificacion" />
                <p className={StylesFooter.footerTxt}>
                  Buscamos que vivas tranquilamente con tu familia
                </p>
              </div>
              <div className={StylesFooter.column5025}>
                <h2 className={StylesFooter.footerTitle}>Links</h2>
                <nav class="navbar navbar-expand-lg bg-body-dark">
                  <div class="container-fluid">
                    <button
                      class="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNavAltMarkup"
                      aria-controls="navbarNavAltMarkup"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div
                      class="collapse navbar-collapse"
                      id="navbarNavAltMarkup"
                    >
                      <div class="navbar-nav">
                        <Link class="nav-link text-light" aria-current="page" href="/">
                          INICIO
                        </Link>
                        <Link class="nav-link text-light" href="/Factura">
                          Mi recibo
                        </Link>
                        <Link class="nav-link text-light" href="/About">
                          Contacto
                        </Link>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              <div className={StylesFooter.column5025}>
                <h2 className={StylesFooter.footerTitle}>Redes sociales</h2>
                <p>Encuentranos en:</p>
                <div className={StylesFooter.socialIcon}>
                 <Link target="blank" href="https://www.facebook.com/ParajesdeMazaGt">
                  <FacebookIcon/>
                 </Link>
                 <Link target="blank" href="https://www.youtube.com/channel/UC5B9AbTL1PL_9wBTQ7TCq2A">
                  <YouTubeIcon/>
                 </Link>
                 <Link target="blank" href="https://www.instagram.com/parajesdemaza/">
                  <InstagramIcon/>
                 </Link>
                </div>
              </div>
              <div className={StylesFooter.column5025}>
                <h2 className={StylesFooter.footerTitle}>Contacto</h2>
                <div className={StylesFooter.contactIcon}>
                  <ApartmentIcon/>
                  <p className="contact__txt">Lotificadora Maza</p>
                </div>
                <div className={StylesFooter.contactIcon}>
                  <LocalPhoneIcon/>
                  <p className="contact__txt">4770 9241</p>
                </div>
                <div className={StylesFooter.contactIcon}>
                  <EmailIcon/>
                  <p className="contact__txt">info@parajesdemaza.com</p>
                </div>
              </div>
            </div>
            <p className={StylesFooter.copy}>
              © 2023 Lotificadora. All Rights Reserved | Design by{" "}
              <span className="color-span">LANGPI</span>
            </p>
          </footer>
        );
    }
  })();
};

export default Footer;
