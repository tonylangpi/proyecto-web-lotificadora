import axios from 'axios'; 

/* consultas al apartado de facturas encabezados */
export async function createFacturasEncabezado(datos){
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}facturas/create`,datos,{
            headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
            }
        }); 
        return data; 
    } catch (error) {
        console.log(error); 
    }
}; 

export async function DeleteEncabezados(id){
    try { 
      const{data} = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}facturas/delete/${id}`,{
          headers:{
              apiKey: process.env.NEXT_PUBLIC_API_KEY
          }
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

/*apartado para llamar los metodos para los detalles de las facturas  */
export async function createDetallesFactura(datos){
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}facturas/createDetalles`,datos,{
            headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
            }
        }); 
        return data; 
    } catch (error) {
        console.log(error); 
    }
}; 

export async function DeleteDetalles(id){
    try { 
      const{data} = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}facturas/deleteDetalle/${id}`,{
          headers:{
              apiKey: process.env.NEXT_PUBLIC_API_KEY
          }
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  /* consulta que sirve al cliente para verificar su factura de mes actual */
  export async function consultaFacturaCliente(datos){
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}facturas/consultafactcliente`,datos,{
            headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
            }
        }); 
        return data; 
    } catch (error) {
        console.log(error); 
    }
}; 