"use client";
import './globals.css'
import { useEffect } from "react";
//import Container from 'react-bootstrap/Container';
import Navbar from '../components/Navbar' ;

export const metadata = {
  title: 'Lotificadora Gastos',
  description: 'Lotificadora gastos clientes y panel',
}

export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <html lang="es">
      <body><Navbar/>{children}</body>
    </html>
  )
}
