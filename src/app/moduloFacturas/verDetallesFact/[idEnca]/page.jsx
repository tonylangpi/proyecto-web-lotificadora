import VerDetalles from '../../../../components/ModuloFacturas/verDetalles';
//import { GetDetalleVivienda } from "../../../../services/moduloPropiedades.js";
import Cargando from '../../../../components/Cargando'; 

const DetallesEncabezado = async({params}) => {  
  //const detalles = await GetDetalleVivienda(params.idVivienda); 
  return (
    <>
      {
        params.idEnca ? (<VerDetalles idEncabezado={params.idEnca}/>) : (<Cargando/>)
      }
    </>
  );
}

export default DetallesEncabezado