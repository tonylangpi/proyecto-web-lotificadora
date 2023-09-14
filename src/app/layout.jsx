"use client";
import './globals.css'
import { useEffect } from "react";
import Providers  from './Provider';
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
      <body><Providers><Navbar/>{children}</Providers></body>
    </html>
  )
}
