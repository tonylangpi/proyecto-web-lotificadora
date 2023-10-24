"use client";
import { Form, Col, Row, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { consultaFacturaCliente } from "../../../services/moduloFacturas";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import FormPago from "../../../components/FormPago";
import Stylesheet from './payment.module.css'
const PagarFactura = () => {
  const [data, setData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      idVivienda: "",
      nombreTarjeta: "",
      correoElectronico: "",
      numeroTarjeta: "",
      mesExpiracion: "",
      yearExpiracion: "",
      cvv: "",
    },
  });
  //configuracion del envio de datos post crear un PROPIETARIO NUEVO
  const enviar = handleSubmit(async (data) => {
    try {
      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      let viviendacod = data?.idVivienda;
      let datos = {
        mes: month,
        year: year,
        viviendacod: viviendacod,
      };
      const consulta = await consultaFacturaCliente(datos);
      if (consulta?.message) {
        toast(consulta?.message, { style: { background: "red" } });
      } else {
        setData(consulta);
      }
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <Toaster position="top-center" offset="100px" />
      <Form onSubmit={enviar}>
        <h4>PAGAR FACTURA CON TARJETA</h4>
        <Row className="align-items-center justify-content-center">
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInput">
              Numero de vivienda o lote
            </Form.Label>
          </Col>
          <Col xs="auto">
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              placeholder="10-068"
              name="idVivienda"
              {...register("idVivienda", {
                required: {
                  value: true,
                  message: "El codigo de la vivienda es requerido",
                },
              })}
            />
            {errors.idVivienda && (
              <span className="text-danger">{errors.idVivienda.message}</span>
            )}
          </Col>
          <Col xs="auto">
          <button type="submit" className={Stylesheet.Btn}>
              Buscar
            </button>
          </Col>
        </Row>
      </Form>
      {data?.encabezado?.length > 0 ? (
        <>
          <div className="row border border-dark border-2 m-3 p-3">
            <>
              <div className="col-4">
                <p>Propietario: <strong>{data.encabezado[0].Propietario}</strong></p>
              </div>
              <div className="col-2">
                <p>Mes: <strong>{data.encabezado[0].Mes}</strong></p>
              </div>
              <div className="col-2">
                <p>Numero de casa: <strong>{data.encabezado[0].CodVivienda}</strong></p>
              </div>
              <div className="col-2">
                <p>
                  Total a pagar:{" "}
                  <strong>Q. {data.encabezado[0].totalRecibo}</strong>
                </p>
              </div>
            </>
          </div>
          <FormPago idVivienda={getValues("idVivienda")} encabezadoFactura={data?.encabezado[0]?.CodigoEncabezado} />
        </>
      ) : null}
    </>
  );
};

export default PagarFactura;
