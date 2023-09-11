//import { Navbar, Nav, Button, Container } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logomaza.jpg";
const Navegador = () => {
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
            <Link href={"/"} className="nav-link text-dark active">INICIO</Link>
            </li>
            <li className="nav-item">
            <Link href={"/Factura"} className="nav-link text-dark active">Mi recibo</Link>
            </li>
            <li className="nav-item">
            <Link href={"/About"} className="nav-link text-dark active">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="btn btn-outline-success me-4">Portal</div>
    </nav>
  );
};

export default Navegador;
