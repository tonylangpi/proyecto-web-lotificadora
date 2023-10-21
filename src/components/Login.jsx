"use client";
import cx from 'classnames';
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from './login.module.css';
// import {Card} from 'react-bootstrap';
// import Image from "next/image";
const CardLogin = () => {
    const [error, setError] = useState("");
    const router = useRouter();
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
        const res = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
          });
          if (res?.error) return setError(res.error);
      
          if (res?.ok) return router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  return (
     <>
     <section className={styles.bgcolor}>
     <main className={cx(styles["form-signin"],"text-center","mt-5")}>
     <img className={styles.image} src="https://i.ibb.co/B25Hmjd/Servis.png"/>
        <form onSubmit={handleSubmit}>
        {error && (
            <div className="bg-danger text-white p-2 mb-2">{error}</div>
          )}
          <h1 className="h3 mb-3 fw-normal">Iniciar Sesion</h1>
      
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" required placeholder="name@example.com" name="email" />
            <label htmlFor="floatingInput">Ingresa Correo</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" required placeholder="Password" name="password" />
            <label htmlFor="floatingPassword">Contraseña</label>
          </div>
          <button className="w-100 btn btn-lg btn-success" type="submit">Ingresar</button>
        </form>
      </main>
     </section>
     </>
  )
}

export default CardLogin