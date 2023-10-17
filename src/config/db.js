//import mysql from 'serverless-mysql'
import {createPool} from 'mysql2/promise'
const {HOST, USER, PASS, PORT, DATABASE} = process.env
const conn = createPool({
    host: HOST,
    user: USER,
    password: PASS,
    port:PORT,
    database:DATABASE
});
conn.getConnection((error) => {
    if (error) {
      console.error('El error de conexión es: ' + error);
      return;
    }
    console.log('Conectado a la base de datos');
  });
export {conn}