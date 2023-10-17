import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logomaza.jpg";
import { signOut } from "next-auth/react";
const NavbarDefault = ({ status }) => {
    const menuAuth = [
        {
            title: "Modulo Propiedades", path: "", submenu: [
                { title: "Propietarios", path: "/moduloPropiedades/propietarios" },
                { title: "viviendas", path: "/moduloPropiedades/viviendas" }
            ]
        },
        {
            title: "Modulo Facturas", path: "", submenu: [
                { title: "Facturas Pendientes Actuales", path: "/moduloFacturas" },
                { title: "Facturas Encabezados", path: "/moduloFacturas/encabezadoFact" }
            ]
        },
    ]
    const menuDefault = [
        { id: 1, title: "Quienes somos", path: "/" },
        { id: 2, title: "Mi recibo", path: "/Factura" },
        { id: 3, title: "Contacto", path: "/About" },
    ]
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link href={"/"} className="navbar-brand">
                    <Image
                        src={Logo}
                        width={100}
                        height={80}
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
                        {
                            status == "authenticated" ?
                                menuAuth.map((item, index) => (
                                    <li key={index} className="nav-item dropdown">
                                        <Link
                                            className="nav-link dropdown-toggle"
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {item.title}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li key={index}>
                                                <Link rel="preload" href={item.submenu.path} className="dropdown-item">
                                                    {item.submenu.title}
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                )) :
                                menuDefault?.map((item) => (
                                    <li key={item.id} className="nav-item">
                                        <Link href={item?.path} className="nav-link text-dark active">
                                            {item?.title}
                                        </Link>
                                    </li>
                                ))
                        }
                    </ul>
                </div>
            </div>
            {status == "authenticated" ?
                <button onClick={() => { signOut() }} className="btn btn-outline-danger me-4">
                    Cerrar Sesion</button> : 
                    <div className="btn btn-outline-success me-4">
                    <Link href={"/Login"} className="nav-link text-dark active">
                        Portal
                    </Link>
                </div>}
        </nav>
    );
};

export default NavbarDefault;