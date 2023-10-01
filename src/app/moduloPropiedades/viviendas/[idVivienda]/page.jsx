'use client';
import CardDetalleVivienda from '../../../../components/ModuloPropiedades/DetalleVivienda';
import {GetDetalleVivienda, getPropietarios} from '../../../../services/moduloPropiedades.js';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState } from 'react';
import useSWR from "swr";
const DetalleVivienda = ({params}) => {  
  console.log(params.idVivienda)
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}viviendas/detallevivienda/${params.idVivienda}`,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

     console.log(data);
  return (
    <>
      {
        data ? (<CardDetalleVivienda detallevivienda={data?.detalleviviendas[0]} propietarios={data?.propietarios}/>) : (<h4>Validando información...</h4>)
      }
    </>
  )
}

export default DetalleVivienda