export {default} from 'next-auth/middleware'; 

export const config = {
    matcher: ["/dashboard", "/moduloPropiedades/:path*", "/moduloFacturas/:path*"]
} // proteccion de rutas xd