"use client";
import { Form, Col, Row, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { consultaFacturaCliente } from "../../services/moduloFacturas.js";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import StylesFact from './tabs.module.css'
const MiFactura = () => {
  const [data, setData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      idVivienda: "",
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
      if(consulta?.message){
        toast(consulta?.message, {style: { background: "red" }});
      }else{
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
        <h4>VER MI FACTURA</h4>
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
            <button type="submit" className={StylesFact.Btn}>
              Buscar
            </button>
          </Col>
        </Row>
      </Form>
      {data?.encabezado?.length > 0 ? (
        <Card className="m-5">
          <Card.Body>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h1 className="text-center">Factura</h1>
                </div>
              </div>
              <div className="row">
                {data?.encabezado ? (
                    <>
                      <div className="col-6">
                        <h4>Información de la factura:</h4>
                        <p>Propietario: {data.encabezado[0].Propietario}</p>
                        <p>Mes: {data.encabezado[0].Mes}</p>
                        <p>Fecha de emsion: {data.encabezado[0].fecha_recibo}</p>
                        <p>Numero de casa: {data.encabezado[0].CodVivienda}</p>
                        <p>Total a pagar:  <strong>Q. {data.encabezado[0].totalRecibo}</strong></p>
                      </div>
                    </>
                ) : (
                  <p>No hay encabezado</p>
                )}
              </div>
              <div className="row">
                <div className="col-12">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Descripción</th>
                        <th>cuota</th>
                      </tr>
                    </thead>
                    <tbody>
                    {data?.detalle ? (
                    data.detalle.map((det, index) => (
                      <tr key={det.idDetalle}>
                        <td>{det.descripcion}</td>
                        <td>{det.cuota}</td>
                      </tr>
                    ))
                  ) : (
                    null
                  )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      ) : (
        null
      )}
    </>
  );
};

export default MiFactura;
