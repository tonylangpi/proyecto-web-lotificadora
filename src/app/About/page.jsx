"use client"
import StyleAbout from './about.module.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from "next/link";
const AboutPage = () => {
  return (
    <section className={StyleAbout.contenedor}>
       <div className={StyleAbout.banner}>
          <h1>Contacto</h1>
       </div>
       <div className={StyleAbout.info}>
       <div className={StyleAbout.contacto}>
              <h3>Información</h3>
              <h4>Telefono: 4770 9241</h4>
               <h4>Correo: info@servihogar.com</h4>
               <div className='row'>
                 <div className='col-md-4'>
                 <Link target="blank" href="https://www.facebook.com/ParajesdeMazaGt">
                  <FacebookIcon className={StyleAbout.icons}/>
                 </Link>
                 </div>
                 <div className='col-md-4'>
                 <Link target="blank" href="https://www.youtube.com/channel/UC5B9AbTL1PL_9wBTQ7TCq2A">
                  <YouTubeIcon className={StyleAbout.icons}/>
                 </Link>
                 </div>
                 <div className='col-md-4'>
                 <Link target="blank" href="https://www.instagram.com/parajesdemaza/">
                  <InstagramIcon className={StyleAbout.icons}/>
                 </Link>
                 </div>
               </div>
         </div>
          <div className={StyleAbout.contenedorMapa}>
          <iframe className={StyleAbout.mapa} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7944.153798525607!2d-91.85119888301848!3d14.712614220594157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858e61cbe70b1be3%3A0xc42239e3c03bb051!2sLomas%20de%20Maz%C3%A1!5e0!3m2!1ses!2sgt!4v1698081987027!5m2!1ses!2sgt" allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
       </div>
    </section>
  )
}

export default AboutPage