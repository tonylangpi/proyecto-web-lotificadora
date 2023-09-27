'use client';
import {Card, Form, Button, Row, Col} from 'react-bootstrap';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
const DetalleVivienda = ({detallevivienda}) => {
    const { data: session } = useSession();
  let idUsuario = session?.user?.id;
  console.log(detallevivienda); 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm({
        mode: "onChange",
        defaultValues: {
          Codigo: "",
          descripcion: "",
          CantidadHabitantes: 0,
          medidas: "",
          idPropietario: 0,
          idUsuario: idUsuario,
        },
      });
    const actualizar = handleSubmit(async (data) => {
        try {
        
          console.log(data); 
        } catch (error) {
          console.log(error);
        }
      });
  return (
    <Form onSubmit={actualizar}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCodigo">
                <Form.Label>Codigo Vivienda</Form.Label>
                <Form.Control
                  type="text"
                  value={detallevivienda.codigo}
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
                  value={detallevivienda.descripcion}
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
                  value={detallevivienda.CantidadHabitantes}
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
                  <option>HOLLAAA</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridMedidas">
                <Form.Label>Medidas</Form.Label>
                <Form.Control
                  type="textarea"
                  value={detallevivienda.medidas}
                  {...register("medidas", {
                    required: {
                      value: true,
                      message:
                        "las medidas son requeridas",
                    }
                  })}
                />
                {errors.medidas && (
                  <span className="text-danger">
                    {errors.medidas.message}
                  </span>
                )}
              </Form.Group>
            </Row>
            <Button variant="warning" type="submit">
              Editar
            </Button>
          </Form>
  )
}

export default DetalleVivienda