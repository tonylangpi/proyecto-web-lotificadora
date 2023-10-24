import CardDetalleServicio from '../../../../components/ModuloPropiedades/DetalleServicio';
import { GetDetalleServicios } from "../../../../services/moduloPropiedades.js";

const DetalleVivienda = async({params}) => {  
  const detalles = await GetDetalleServicios(params.idservicio);
  return (
    <>
      {
        detalles ? (<CardDetalleServicio detalleservicio={detalles[0]} />) : (<h2>Validando informacion</h2>)
      }
    </>
  );
}

export default DetalleVivienda