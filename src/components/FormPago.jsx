"use client";
import { Form, Col, Row, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { pagarFacturas } from "../services/moduloFacturas.js";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import StylesPago from './formpago.module.css'
const FormPago = ({ idVivienda, encabezadoFactura }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      idVivienda: idVivienda ? idVivienda : "",
      encabezadoFactura: encabezadoFactura ? encabezadoFactura : "",
      nombreTarjeta: "",
      numeroTarjeta: "",
      expiracion: "",
      cvv: "",
    },
  });

   //configuracion del envio de datos post crear un PROPIETARIO NUEVO
   const enviar = handleSubmit(async (data) => {
    try {
      const res = await pagarFacturas(data);
      toast(res?.message)
      reset();
      console.log(res); 
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <form className={StylesPago.FORM} onSubmit={enviar}>
        <div className={StylesPago.separator}>
          <hr className="line" />
          <p>IFORMACIÓN DE TARJETA DE CREDITO</p>
          <hr className="line" />
        </div>
        <div className={StylesPago.CrediCardInfo}>
          <div className={StylesPago.inputContainer}>
            <label htmlFor="password_field" className={StylesPago.inputLabel}>
              Nombre del propíetario de tarjeta
            </label>
            <input
              id="password_field"
              className={StylesPago.inputField}
              type="text"
              {...register("nombreTarjeta", {
                required: {
                  value: true,
                  message: "El nombre de la tarjeta de credito es requerido",
                },
              })}
              placeholder="Ingresa a nombre de quien esta la tarjeta"
            />
             {errors.nombreTarjeta && (
              <span className="text-danger">{errors.nombreTarjeta.message}</span>
            )}
          </div>
          <div className={StylesPago.inputContainer}>
            <label htmlFor="password_field" className={StylesPago.inputLabel}>
              Tarjeta Numero
            </label>
            <input
              id="password_field"
              className={StylesPago.inputField}
              type="text"
              {...register("numeroTarjeta", {
                required: {
                  value: true,
                  message: "campo requerido",
                },
                pattern: {
                      value: /^(?:\d{4}\s*)+$/,
                      message: "Numero de tarjeta no válido puede ser xxxx xxxx xxxx xxxx",
                    },
              })}
              placeholder="0000 0000 0000 0000"
            />
             {errors.numeroTarjeta && (
              <span className="text-danger">{errors.numeroTarjeta.message}</span>
            )}
          </div>
          <div className={StylesPago.inputContainer}>
            <label htmlFor="password_field" className={StylesPago.inputLabel}>
              Fecha de expiración / CVV
            </label>
            <div className={StylesPago.split}>
              <input
                id="password_field"
                className={StylesPago.inputField}
                type="text"
                name="input-name"
                title="fecha expiracion"
                {...register("expiracion", {
                required: {
                  value: true,
                  message: "campo requerido",
                },
                pattern: {
                      value: /^(0[1-9]|1[0-2])\/(2[2-9]|2[3-9]|3[0-9])$/,
                      message: "formato de fecha de expiracion es MM/YY",
                    },
              })}
                placeholder="01/23"
              />
              {errors.expiracion && (
              <span className="text-danger">{errors.expiracion.message}</span>
              )}
              <input
                id="password_field"
                className={StylesPago.inputField}
                type="number"
                name="cvv"
                title="CVV"
                {...register("cvv", {
                required: {
                  value: true,
                  message: "campo requerido"
                },
                  minLength: 3,
                  maxLength: 3
              })}
                placeholder="CVV"
              />
                {errors.cvv && (
              <span className="text-danger">{errors.cvv.message}</span>
              )}
              {errors.cvv?.type === "maxLength" && (
                  <span className="text-danger">
                    el minimo de carateres es 3
                  </span>
                )}
                {errors.cvv?.type === "minLength" && (
                  <span className="text-danger">
                  el minimo de carateres es 3
                  </span>
                )}
            </div>
          </div>
        </div>
        <button className={StylesPago.purchasebtn}>PAGAR</button>
      </form>
    </>
  );
};

export default FormPago;
