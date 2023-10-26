//"use client";
import "./globals.css";
//import { useEffect } from "react";
import Providers from "./Provider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SWRProvider } from "./swr-provider";
import { Lora } from 'next/font/google';
export const metadata = {
  title: "Lotificadora Gastos",
  description: "Lotificadora gastos clientes y panel"
};
const inter = Lora({ subsets: ['latin'] })
export default function RootLayout({ children }) {
  // useEffect(() => {
  //   require("bootstrap/dist/js/bootstrap.bundle.min.js");
  // }, []);
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <SWRProvider>
            <Navbar />
            {children}
            <Footer/>
          </SWRProvider>
        </Providers>
      </body>
    </html>
  );
}
