'use client';
import CardDetalleVivienda from '../../../../components/ModuloPropiedades/DetalleVivienda';
import useSWR from "swr";
const DetalleVivienda = ({params}) => {  
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}viviendas/detallevivienda/${params.idVivienda}`,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return (
    <>
      {
        data ? (<CardDetalleVivienda detallevivienda={data?.detalleviviendas[0]} propietarios={data?.propietarios}/>) : (<h4>Validando información...</h4>)
      }
    </>
  )
}

export default DetalleVivienda