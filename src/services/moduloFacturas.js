import axios from 'axios'; 

/* consultas al apartado de facturas encabezados */
export async function createViviendas(datos){
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