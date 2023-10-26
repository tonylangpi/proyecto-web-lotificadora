//import mysql from 'serverless-mysql'
import {createPool} from 'mysql2/promise';
const conn = createPool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASS,
    port:process.env.BD_PORT,
    database:process.env.BD_DATABASE
});
conn.getConnection((error) => {
    if (error) {
      console.error('El error de conexión es: ' + error);
      return;
    }
    console.log('Conectado a la base de datos');
  });
export {conn}