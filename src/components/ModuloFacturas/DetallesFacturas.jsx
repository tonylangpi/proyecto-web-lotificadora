"use client";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { EditDetalleViviendas } from "../../services/moduloPropiedades.js";
const DetallesFacturas = ({ idEncabezado }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      idReciboGastoEncabezado: idEncabezado ? idEncabezado : '',
      idServicio: 0,
      cuota: 0
    },
  });
  const guardar = handleSubmit(async (data) => {
    try {
      // const res = await EditDetalleViviendas(data);
      // toast(res?.message);
      console.log(data);
      reset(); 
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <Toaster position="top-center" offset="80px" />
      <Card className="m-3">
        <Card.Header>DETALLES FACTURA</Card.Header>
        <Card.Body>
          <Form onSubmit={guardar}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCodigo">
                <Form.Label>Codigo Encabezado</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  readOnly
                  {...register("idReciboGastoEncabezado", {
                    required: {
                      value: true,
                      message: "El idReciboGastoEncabezado de la vivienda es requerido",
                    }
                  })}
                />
                {errors.idReciboGastoEncabezado && (
                  <span className="text-danger">{errors.idReciboGastoEncabezado.message}</span>
                )}
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCantidadHabitantes">
                <Form.Label>cuota</Form.Label>
                <Form.Control
                  type="text"
                  {...register("cuota", {
                    required: {
                      value: true,
                      message:
                        "cuota es requerida",
                    }
                  })}
                />
                {errors.cuota && (
                  <span className="text-danger">
                    {errors.cuota.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPropietario">
                <Form.Label>SERVICIO</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="propietarios"
                  {...register("idServicio",  {
                    required: {
                      value: true,
                      message: "El Servicio es requerido",
                    }
                  })}
                >
                  <option>AGUA</option>
                  <option>LUZ</option>
                </Form.Select>
                {errors.idServicio && (
                  <span className="text-danger">{errors.idServicio.message}</span>
                )}
              </Form.Group>
            </Row>
            <Button variant="warning" type="submit">
              AGREGAR
            </Button>
            <Button
              variant="info"
              className="m-3"
              onClick={() => {
                router.back();
              }}
            >
              Regresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default DetallesFacturas;
