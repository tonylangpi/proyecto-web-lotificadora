import {getViviendasInfo, getPropietarios} from '../../../services/moduloPropiedades.js';
import TablaViviendas from '../../../components/ModuloPropiedades/TablaViviendas.jsx'; 
const Viviendas =  async() => {
  const viviendas = await getViviendasInfo(); 
  const propietarios = await getPropietarios(); 
  return (
    <>
    {
      viviendas ? <TablaViviendas datos={viviendas} propie={propietarios}/> : <h1>Cargando...</h1>
    }
    </>
  )
}

export default Viviendas