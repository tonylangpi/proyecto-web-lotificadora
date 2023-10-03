"use client";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { EditDetalleViviendas } from "../../services/moduloPropiedades.js";
const DetalleVivienda = ({ detallevivienda, propietarios }) => {
  const router = useRouter();
  const { data: session } = useSession();
  let idUsuario = session?.user?.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      Codigo: detallevivienda ? detallevivienda.codigo : '',
      descripcion: detallevivienda ? detallevivienda.descripcion : '',
      CantidadHabitantes: detallevivienda ? detallevivienda.CantidadHabitantes : '',
      medidas: detallevivienda? detallevivienda.medidas : '',
      idPropietario: detallevivienda ? detallevivienda.idPropietario : '',
      idUsuario: idUsuario,
    },
  });
  const actualizar = handleSubmit(async (data) => {
    try {
      const res = await EditDetalleViviendas(data);
      toast(res?.message);
      reset(); 
      router.refresh();
      router.push("/moduloPropiedades/viviendas");
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <Toaster position="top-center" offset="80px" />
      <Card className="m-3">
        <Card.Header>EDITAR VIVIENDA</Card.Header>
        <Card.Body>
          <Form onSubmit={actualizar}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCodigo">
                <Form.Label>Codigo Vivienda</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  readOnly
                  {...register("Codigo", {
                    required: {
                      value: true,
                      message: "El codigo de la vivienda es requerido",
                    },
                    maxLength: 30,
                    minLength: 3,
                  })}
                />
                {errors.Codigo && (
                  <span className="text-danger">{errors.Codigo.message}</span>
                )}
                {errors.Codigo?.type === "maxLength" && (
                  <span className="text-danger">
                    Los Codigos no deben superar los 30 caracteres
                  </span>
                )}
                {errors.Codigo?.type === "minLength" && (
                  <span className="text-danger">
                    El codigo debe ser mayor o igual a 3 caracteres
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDescripcion">
                <Form.Label>Descripcion Vivienda</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  {...register("descripcion", {
                    required: {
                      value: true,
                      message: "Descripcion requerida",
                    },
                    maxLength: 250,
                    minLength: 5,
                  })}
                />
                {errors.descripcion && (
                  <span className="text-danger">
                    {errors.descripcion.message}
                  </span>
                )}
                {errors.descripcion?.type === "maxLength" && (
                  <span className="text-danger">
                    La descripcion tiene limite de 250 caracteres
                  </span>
                )}
                {errors.descripcion?.type === "minLength" && (
                  <span className="text-danger">
                    la descripcion debe tener al menos 5 caracteres
                  </span>
                )}
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCantidadHabitantes">
                <Form.Label>Cantidad de Habitantes</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  {...register("CantidadHabitantes", {
                    required: {
                      value: true,
                      message:
                        "Cantidad de habitantes de la vivienda es requerida",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message:
                        "CantidadHabitantes no válido, son solo numeros no letras",
                    },
                  })}
                />
                {errors.CantidadHabitantes && (
                  <span className="text-danger">
                    {errors.CantidadHabitantes.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPropietario">
                <Form.Label>Propietario</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="propietarios"
                  {...register("idPropietario")}
                >
                  {propietarios.map((cat, index) => (
                    <option key={index} value={cat.idPropietario}>
                      {`${cat.nombre}  ${cat.apellido}`}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridMedidas">
                <Form.Label>Medidas</Form.Label>
                <Form.Control
                  type="textarea"
                  {...register("medidas", {
                    required: {
                      value: true,
                      message: "las medidas son requeridas",
                    },
                  })}
                />
                {errors.medidas && (
                  <span className="text-danger">{errors.medidas.message}</span>
                )}
              </Form.Group>
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

export default DetalleVivienda;
