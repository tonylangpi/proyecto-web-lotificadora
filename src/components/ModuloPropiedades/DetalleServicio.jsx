"use client";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { EditDetalleServicios } from "../../services/moduloPropiedades.js";
const DetalleServicio = ({ detalleservicio }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      idServicio: detalleservicio ? detalleservicio.idServicio : '',
      descripcion: detalleservicio ? detalleservicio.descripcion : '',
      tipoServicio: detalleservicio ? detalleservicio.TipoServicio : '',
      cuotaBase:  detalleservicio?.TipoServicio == 'FIJO' ? detalleservicio.cuotaBase : ''
    },
  });
  const actualizar = handleSubmit(async (data) => {
    try {
      const res = await EditDetalleServicios(data);
      toast(res?.message);
      reset(); 
      router.refresh();
      router.push("/moduloPropiedades/servicios");
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <Toaster position="top-center" offset="80px" />
      <Card className="m-3">
        <Card.Header>EDITAR SERVICIO</Card.Header>
        <Card.Body>
          <Form onSubmit={actualizar}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCodigo">
                <Form.Label>Id Servicio</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  readOnly
                  {...register("idServicio", {
                    required: {
                      value: true,
                      message: "El idServicio de la vivienda es requerido",
                    }
                  })}
                />
                {errors.idServicio && (
                  <span className="text-danger">{errors.idServicio.message}</span>
                )}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDescripcion">
                <Form.Label>Descripcion del servicio</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  {...register("descripcion", {
                    required: {
                      value: true,
                      message: "Descripcion requerida",
                    },
                    maxLength: 100,
                    minLength: 3,
                  })}
                />
                {errors.descripcion && (
                  <span className="text-danger">
                    {errors.descripcion.message}
                  </span>
                )}
                {errors.descripcion?.type === "maxLength" && (
                  <span className="text-danger">
                    La descripcion tiene limite de 100 caracteres
                  </span>
                )}
                {errors.descripcion?.type === "minLength" && (
                  <span className="text-danger">
                    la descripcion debe tener al menos 3 caracteres
                  </span>
                )}
              </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridDescripcion">
                <Form.Label>Tipo servicio</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  readOnly
                  style={{ height: "100px" }}
                  {...register("tipoServicio", {
                    required: {
                      value: true,
                      message: "tipoServicio requerida",
                    },
                    maxLength: 50,
                    minLength: 3,
                  })}
                />
                {errors.tipoServicio && (
                  <span className="text-danger">
                    {errors.tipoServicio.message}
                  </span>
                )}
                {errors.tipoServicio?.type === "maxLength" && (
                  <span className="text-danger">
                    El tipoServicio tiene limite de 50 caracteres
                  </span>
                )}
                {errors.tipoServicio?.type === "minLength" && (
                  <span className="text-danger">
                    El tipoServicio debe tener al menos 3 caracteres
                  </span>
                )}
              </Form.Group>
              {
                getValues("tipoServicio") == "FIJO" ? ( <Form.Group as={Col} controlId="formGridCantidadHabitantes">
                <Form.Label>ingrese Cuota Base</Form.Label>
                <Form.Control
                  type="text"
                  {...register("cuotaBase", {
                    required: {
                      value: true,
                      message:
                        "cuotaBase del servicio requerida",
                    },
                    pattern: {
                      value: /^[0-9.]+$/,
                      message:
                        "La cuota base no válido, son solo numeros no letras",
                    }
                  })}
                />
                {errors.cuotaBase && (
                  <span className="text-danger">
                    {errors.cuotaBase.message}
                  </span>
                )}
              </Form.Group>) : (null)
              }
            </Row>
            <Button variant="warning" type="submit">
              Editar
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

export default DetalleServicio;
