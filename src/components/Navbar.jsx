"use client";
import { useSession } from "next-auth/react";
import NavbarDefault from "./NavbarDefault";
const Navegador = () => {
  const { status } = useSession();
  return (() => {
    switch (status) {
      case "authenticated": //si el usuario esta autenticado retorna el dashboard
        return (
           <NavbarDefault status={status}/>
        );
      case "loading":
        return <NavbarDefault status={status} />;
      case "unauthenticated":
        return <NavbarDefault status={status} />;
      default:
        return <NavbarDefault status={status} />;
    }
  })();
};

export default Navegador;
