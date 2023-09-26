import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"; 
import {conn} from '../../../../config/db';
import bcrypt from 'bcryptjs'; 

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
         email: {label:"Email", type: "email", placeholder:"langpi@gmail.com"},
         password: {label:"Password", type: "password"}
      },
      async authorize(credentials) {
        const [rows] = await conn.query(`SELECT * FROM usuarios WHERE correo = ?`, [credentials?.email]);
        let usuarioEncontrado = rows;
        let objetoUsuario = usuarioEncontrado[0];
        if(objetoUsuario == undefined) throw new Error("Credenciales invalidas"); 
        const passworMatch = await bcrypt.compare(credentials.password, objetoUsuario.clave);
        if(!passworMatch) throw new Error("Credenciales invalidas"); 
        
        return  objetoUsuario; 
      }
    })
  ],
  callbacks: {
      jwt({account, token, user, profile, session}){
          if(user) token.user = user; 
          return token;
      },
      session({session,token}){
        session.user = token.user 
        return session;
      }
  },
  pages: {
    signIn : '/Login'
  },
  // rateLimit: {
  //   ip: {
  //     // Límite de peticiones por hora
  //     limit: 4,
  //     // Tiempo de espera en segundos
  //     delay: 60,
  //   }
  // }
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }