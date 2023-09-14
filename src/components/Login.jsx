"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {Card} from 'react-bootstrap';
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
      <Card className='m-5'>
      <Card.Header>
         Iniciar sesión solo Admins
      </Card.Header>
      <Card.Body>
      <form onSubmit={handleSubmit}>
       {error && (
            <div className="bg-danger text-white p-2 mb-2">{error}</div>
          )}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Correo
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            clave
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          ingresar
        </button>
      </form>
      </Card.Body>
    </Card>
     </>
  )
}

export default CardLogin