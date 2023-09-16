import React from 'react'

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white p-2 fixed-bottom">
      <div className="row">
        <div className="col-md-3">
          <h3>Contacto</h3>
          <p>
            Tel: 555-555-5555
            <br/>
            Email: info@tu-lotificadora.com
          </p>
        </div>
        <div className="col-md-3">
          <h3>Información legal</h3>
          <p>
            © 2023 Maza. Todos los derechos reservados.
          </p>
        </div>
      </div>
  </footer>
  )
}

export default Footer