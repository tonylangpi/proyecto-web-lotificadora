import CardDetalleVivienda from '../../../../components/ModuloPropiedades/DetalleVivienda';
import {GetDetalleVivienda, getPropietarios} from '../../../../services/moduloPropiedades.js';
const DetalleVivienda = async({params}) => {
    const viviendaDetalle = await GetDetalleVivienda(params?.idVivienda); 
    const propietarios = await getPropietarios();
    let objetoDetalleVivienda = viviendaDetalle[0];
    if(objetoDetalleVivienda == undefined) throw new Error("objeto vacio"); 
  return (
     <CardDetalleVivienda detallevivienda={objetoDetalleVivienda} propietarios={propietarios}/>
  )
}

export default DetalleVivienda