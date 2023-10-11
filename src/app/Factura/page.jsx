"use client";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const MiFactura = () => {
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
      console.log(viviendacod); 
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <Form onSubmit={enviar}>
      <h4>MI RECIBO DE MES GASTOS</h4>
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
                message:
                  "El codigo de la vivienda es requerido",
              },
            })}
          />
           {errors.idVivienda && (
                      <span className="text-danger">
                        {errors.idVivienda.message}
                      </span>
                    )}
        </Col>
        <Col xs="auto">
          <Button type="submit" className="mb-2">
            Buscar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default MiFactura;
