import CardDetallesFacturas from '../../../../components/ModuloFacturas/DetallesFacturas';
//import { GetDetalleVivienda } from "../../../../services/moduloPropiedades.js";
import Cargando from '../../../../components/Cargando'; 

const DetallesEncabezado = async({params}) => {  
  //const detalles = await GetDetalleVivienda(params.idVivienda); 
  return (
    <>
      {
        params.idEncabezado ? (<CardDetallesFacturas idEncabezado={params.idEncabezado}/>) : (<Cargando/>)
      }
    </>
  );
}

export default DetallesEncabezado