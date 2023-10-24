import axios from 'axios'; 
/*MODULO DE PROPIETARIOS PETICIONES A LA API */
export async function getPropietarios(){
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}propietarios/all`,{
            headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
            }
        }); 
        return data; 
    } catch (error) {
        console.log(error); 
    }
}
export async function createPropietarios(datos){
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}propietarios/create`,datos,{
            headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
            }
        }); 
        return data; 
    } catch (error) {
        console.log(error); 
    }
}
export async function updateStatusPropietarios(id){
    try {
        const{data} = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}propietarios/delete/${id}`,{
            headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
            }
        });
        return data; 
    } catch (error) {
        
    }
}
export async function editPropietarios(datosEdit){ 
    try {
        const{data} = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}propietarios/edit`,datosEdit,{
            headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
            }
        });
        return data; 
    } catch (error) {
        console.log(error); 
    }
}
/*MODULO DE VIVIENDAS FUNCIONES DE API SERVICIOS */
export async function getViviendasInfo(){
    try {
        const{data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}viviendas/all`,{
            headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
            }
        });
        return data; 
    } catch (error) {
        console.log(error); 
    }
}

export async function createViviendas(valores){
    try {
        const{data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}viviendas/create`,valores,{
            headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
            }
        });
        return data; 
    } catch (error) {
        console.log(error); 
    }
}



export async function GetDetalleVivienda(codigo){
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}viviendas/detallevivienda/${codigo}`,{
            headers:{
                 apiKey: process.env.NEXT_PUBLIC_API_KEY
            },
        });
        return data; 
    } catch (error) {
        console.log(error); 
    }
}

export async function EditDetalleViviendas(values){
    try {
        const{data} = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}viviendas/edit`,values,{
            headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
            }
        });
        return data; 
    } catch (error) {
        console.log(error); 
    }
};

export async function DeleteViviendas(id){
  try { 
    const{data} = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}viviendas/delete/${id}`,{
        headers:{
            apiKey: process.env.NEXT_PUBLIC_API_KEY
        }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
/*SERVICIOS CRUD LLAMADA A FUNCIONES */
export async function createServicios(valores){
    try {
        const{data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}servicios/create`,valores,{
            headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
            }
        });
        return data; 
    } catch (error) {
        console.log(error); 
    }
}

export async function updateStatusServicios(id){
    try {
        const{data} = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}servicios/delete/${id}`,{
            headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
            }
        });
        return data; 
    } catch (error) {
        
    }
};

export async function GetDetalleServicios(codigo){
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}servicios/servicioById/${codigo}`,{
            headers:{
                 apiKey: process.env.NEXT_PUBLIC_API_KEY
            },
        });
        return data; 
    } catch (error) {
        console.log(error); 
    }
};

export async function EditDetalleServicios(values){
    try {
        const{data} = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}servicios/edit`,values,{
            headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
            }
        });
        return data; 
    } catch (error) {
        console.log(error); 
    }
};