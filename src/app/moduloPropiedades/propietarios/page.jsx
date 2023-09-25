import {getPropietarios} from '../../../services/moduloPropiedades.js'
import TablaPropietarios from '../../../components/ModuloPropiedades/TablaPropietarios';
const Propietarios = async() => {
  const propietarios = await getPropietarios();
  return (
    <>
    {
      propietarios ? <TablaPropietarios datos={propietarios}/> : <h1>Cargando...</h1>
    }
    </>
  )
}

export default Propietarios