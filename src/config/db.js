//import mysql from 'serverless-mysql'
import {createPool} from 'mysql2/promise'
const conn = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    port:3306,
    database:process.env.DATABASE
});
conn.getConnection((error) => {
    if (error) {
      console.error('El error de conexión es: ' + error);
      return;
    }
    console.log('Conectado a la base de datos RAILWAY.');
  });
export {conn}