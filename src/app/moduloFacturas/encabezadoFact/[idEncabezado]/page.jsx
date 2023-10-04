import CardDetallesFacturas from '../../../../components/ModuloFacturas/DetallesFacturas';
//import { GetDetalleVivienda } from "../../../../services/moduloPropiedades.js";

const DetallesEncabezado = async({params}) => {  
  //const detalles = await GetDetalleVivienda(params.idVivienda); 
  return (
    <>
      {
        params.idEncabezado ? (<CardDetallesFacturas idEncabezado={params.idEncabezado}/>) : (<h2>Validando informacion</h2>)
      }
    </>
  );
}

export default DetallesEncabezado