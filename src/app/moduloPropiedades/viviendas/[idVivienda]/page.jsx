import CardDetalleVivienda from '../../../../components/ModuloPropiedades/DetalleVivienda';
import { GetDetalleVivienda } from "../../../../services/moduloPropiedades.js";

const DetalleVivienda = async({params}) => {  
  const detalles = await GetDetalleVivienda(params.idVivienda);
  return (
    <>
      {
        detalles ? (<CardDetalleVivienda detallevivienda={detalles.detalleviviendas[0]} propietarios={detalles.propietarios}/>) : (<h2>Validando informacion</h2>)
      }
    </>
  );
}

export default DetalleVivienda