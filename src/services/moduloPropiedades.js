import axios from 'axios'; 
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