import CardDetalleVivienda from '../../../../components/ModuloPropiedades/DetalleVivienda';
import {GetDetalleVivienda} from '../../../../services/moduloPropiedades.js';
const DetalleVivienda = async({params}) => {
    const viviendaDetalle = await GetDetalleVivienda(params?.idVivienda); 
    let objetoDetalleVivienda = viviendaDetalle[0];
    if(objetoDetalleVivienda == undefined) throw new Error("objeto vacio"); 
  return (
     <CardDetalleVivienda detallevivienda={objetoDetalleVivienda}/>
  )
}

export default DetalleVivienda