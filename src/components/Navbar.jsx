"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logomaza.jpg";
import { useSession, signOut } from "next-auth/react";
const Navegador = () => {
  const { status } = useSession();
  return (() => {
    switch (status) {
      case "authenticated": //si el usuario esta autenticado retorna el dashboard
        return (
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <Link href={"/"} className="navbar-brand">
                <Image
                  src={Logo}
                  width={100}
                  height={100}
                  alt="Imagen lotificacion"
                />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Modulo Propiedades
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Propietarios
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Viviendas
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link
                      href={"/dashboard"}
                      className="nav-link text-dark active"
                    >
                      Modulo Facturas
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => {
                signOut();
              }}
              className="btn btn-outline-danger me-4"
            >
              Cerrar Sesion
            </button>
          </nav>
        );
      case "loading":
        return (
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <Link href={"/"} className="navbar-brand">
                <Image
                  src={Logo}
                  width={100}
                  height={100}
                  alt="Imagen lotificacion"
                />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link href={"/"} className="nav-link text-dark active">
                      INICIO
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href={"/Factura"}
                      className="nav-link text-dark active"
                    >
                      Mi recibo
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/About"} className="nav-link text-dark active">
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="btn btn-outline-success me-4">
              <Link href={"/Login"} className="nav-link text-dark active">
                Portal
              </Link>
            </div>
          </nav>
        );
      case "unauthenticated":
        return (
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <Link href={"/"} className="navbar-brand">
                <Image
                  src={Logo}
                  width={100}
                  height={100}
                  alt="Imagen lotificacion"
                />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link href={"/"} className="nav-link text-dark active">
                      Nuestra Empresa
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href={"/Factura"}
                      className="nav-link text-dark active"
                    >
                      Mi recibo
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/About"} className="nav-link text-dark active">
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="btn btn-outline-success me-4">
              <Link href={"/Login"} className="nav-link text-dark active">
                Portal
              </Link>
            </div>
          </nav>
        );
      default:
        return (
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <Link href={"/"} className="navbar-brand">
                <Image
                  src={Logo}
                  width={100}
                  height={100}
                  alt="Imagen lotificacion"
                />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link href={"/"} className="nav-link text-dark active">
                      INICIO
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href={"/Factura"}
                      className="nav-link text-dark active"
                    >
                      Mi recibo
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/About"} className="nav-link text-dark active">
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="btn btn-outline-success me-4">
              <Link href={"/Login"} className="nav-link text-dark active">
                Portal
              </Link>
            </div>
          </nav>
        );
    }
  })();
};

export default Navegador;
