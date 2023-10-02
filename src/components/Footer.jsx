"use client";
import React from "react";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { status } = useSession();
  return (() => {
    switch (status) {
      case "authenticated": //si el usuario esta autenticado retorna el dashboard
        return <footer className="footer bg-dark text-white fixed-bottom">BIENVENIDO SISTEMAS GT</footer>;
      case "loading":
        return (
          <footer className="footer bg-dark text-white p-2 fixed-bottom">
            <div className="row">
              <div className="col-md-3">
                <h3>Contacto</h3>
                <p>
                  Tel: 555-555-5555
                  <br />
                  Email: info@tu-lotificadora.com
                </p>
              </div>
              <div className="col-md-3">
                <h3>Información legal</h3>
                <p>© 2023 Maza. Todos los derechos reservados.</p>
              </div>
            </div>
          </footer>
        );
      case "unauthenticated":
        return (
          <footer className="footer bg-dark text-white p-2 fixed-bottom">
            <div className="row">
              <div className="col-md-3">
                <h3>Contacto</h3>
                <p>
                  Tel: 555-555-5555
                  <br />
                  Email: info@tu-lotificadora.com
                </p>
              </div>
              <div className="col-md-3">
                <h3>Información legal</h3>
                <p>© 2023 Maza. Todos los derechos reservados.</p>
              </div>
            </div>
          </footer>
        );
      default:
        return (
          <footer className="footer bg-dark text-white p-2 fixed-bottom">
            <div className="row">
              <div className="col-md-3">
                <h3>Contacto</h3>
                <p>
                  Tel: 555-555-5555
                  <br />
                  Email: info@tu-lotificadora.com
                </p>
              </div>
              <div className="col-md-3">
                <h3>Información legal</h3>
                <p>© 2023 Maza. Todos los derechos reservados.</p>
              </div>
            </div>
          </footer>
        );
    }
  })();
};

export default Footer;
