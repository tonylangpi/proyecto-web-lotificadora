"use client";
import React, { useMemo } from "react";
import { Toaster, toast } from "sonner";
import { useSession } from "next-auth/react";
import { MaterialReactTable } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { Form, Col, Row, Button, Modal, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import {
    createServicios,
    updateStatusServicios,
} from "../../../services/moduloPropiedades.js";
const Servicios = () => {
  const [show, setShow] = useState(false);
  const [manejacuota,setManejaCuota] = useState(false); 
  const handleClose = () => setShow(false); //cierra modal de creacion de usuarios
  const handleShow = () => setShow(true); //abre modal de creacion de usuarios
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}servicios/all`,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
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
      descripcion: "",
      cuotaBase: 0,
    },
  });

  const columns = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "idServicio", //simple recommended way to define a column
        header: "idServicio",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "descripcion",
        header: "Descripcion del servicio",
        size: 50,
        Header: <i style={{ color: "blue" }}>Descripcion del servicio</i>,
      },
      {
        accessorKey: "cuotaBase", //simple recommended way to define a column
        header: "cuota Base",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "Estado",
        header: "Estado",
        size: 100,
        Header: <i style={{ color: "green" }}>Estado</i>,
      },
      {
        accessorKey: "TipoServicio",
        header: "TipoServicio",
        size: 100,
        Header: <i style={{ color: "green" }}>Tipo Servicio</i>,
      }
    ],
    []
  );

  //configuracion del envio de datos post crear un PROPIETARIO NUEVO
  const enviar = handleSubmit(async(data) => {
    try {
      const res = await createServicios(data);
      toast(res?.message);
      mutate();
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Toaster position="top-center" offset="80px" />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Datos del servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={enviar}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCodigo">
                <Form.Label>Descripcion Servicio</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="servicio de garita etc"
                  {...register("descripcion", {
                    required: {
                      value: true,
                      message: "la descripcion del servicio es requerido",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]*$/,
                      message:
                        "La descripcion no válida, solo son letras no numeros",
                    },
                    maxLength: 100,
                    minLength: 3,
                  })}
                />
                {errors.descripcion && (
                  <span className="text-danger">{errors.descripcion.message}</span>
                )}
                {errors.descripcion?.type === "maxLength" && (
                  <span className="text-danger">
                    Los descripcion no deben superar los 100 caracteres
                  </span>
                )}
                {errors.descripcion?.type === "minLength" && (
                  <span className="text-danger">
                    La descripcion debe ser mayor o igual a 3 caracteres
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDescripcion">
                <Form.Label>¿Tendra el servicio cuota Base?</Form.Label>
                <Button variant="success" onClick={()=>{
                     setManejaCuota(true); 
                }} >Si</Button>
                <Button variant="info" className="m-3" onClick={()=>{
                     setManejaCuota(false); 
                }} >NO</Button>
              </Form.Group>
            </Row>
            {
                manejacuota ? (
                <Form.Group as={Col} controlId="formGridCantidadHabitantes">
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
              </Form.Group>
                ) : (null)
            }
            <Button variant="primary" type="submit">
              Agregar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <h5>Servicios</h5>
      {data ? (
        <Card className="m-2">
          <Card.Body>
            <MaterialReactTable
              columns={columns}
              enableRowActions
              enableDensityToggle={false}
              initialState={{ density: 'compact' }}
              data={data ? data : []}
              muiTableProps={{
                sx: {
                  border: "1px solid rgba(81, 81, 81, 1)",
                },
              }}
              renderRowActions={({ row, table }) => (
                <div className="d-flex p-2">
                <>

                </>
                 <OverlayTrigger
                              placement="right"
                              delay={{ show: 250, hide: 400 }}
                              overlay={
                                <Tooltip>
                                  <strong>Cambiar estado</strong>.
                                </Tooltip>
                              }
                            >
                  <Button
                    className="btn btn-danger"
                    onClick={async () => {
                      if (
                        !confirm(
                          `Deseas cambiar el estado del servicio con codigo: ${row.getValue(
                            "idServicio"
                          )}`
                        )
                      ) {
                        return;
                      }
                      let res = await updateStatusServicios(row.getValue("idServicio"));
                      toast(res?.message, { style: { background: "red" } });
                      mutate();
                    }}
                  >
                    <ChangeCircleIcon />
                  </Button>
                </OverlayTrigger>
                  <OverlayTrigger
                              placement="right"
                              delay={{ show: 250, hide: 400 }}
                              overlay={
                                <Tooltip>
                                  <strong>EDITAR</strong>.
                                </Tooltip>
                              }
                            >
                  <Button
                    className="btn btn-warning"
                    onClick={() => {
                      router.push(
                        `/moduloPropiedades/servicios/${row.getValue("idServicio")}`
                      );
                    }}
                  >
                    <EditIcon />
                  </Button>
                  </OverlayTrigger>
                </div>
              )}
              positionActionsColumn="last"
              renderTopToolbarCustomActions={() => (
                <Button variant="primary" onClick={handleShow}>
                  Agregar
                </Button>
              )}
              localization={{
                actions: "Acciones",
                and: "y",
                cancel: "Cancelar",
                changeFilterMode: "Cambiar modo de filtro",
                changeSearchMode: "Cambiar modo de búsqueda",
                clearFilter: "Borrar filtro",
                clearSearch: "Borrar búsqueda",
                clearSort: "Borrar ordenamiento",
                clickToCopy: "Haga click para copiar",
                collapse: "Colapsar",
                collapseAll: "Colapsar todo",
                columnActions: "Columna de acciones",
                copiedToClipboard: "Copiado al portapapeles",
                dropToGroupBy: "Soltar para agrupar por {column}",
                edit: "Editar",
                expand: "Expandir",
                expandAll: "Expandir todo",
                filterArrIncludes: "Incluye",
                filterArrIncludesAll: "Incluye todos",
                filterArrIncludesSome: "Incluye algunos",
                filterBetween: "Entre",
                filterBetweenInclusive: "Entre (inclusivo)",
                filterByColumn: "Filtrar por {column}",
                filterContains: "Contiene",
                filterEmpty: "Vacio",
                filterEndsWith: "Termina con",
                filterEquals: "Iguales",
                filterEqualsString: "Iguales",
                filterFuzzy: "Difuso",
                filterGreaterThan: "Mas grande que",
                filterGreaterThanOrEqualTo: "Mas grande que o igual a",
                filterInNumberRange: "Entre",
                filterIncludesString: "Contiene",
                filterIncludesStringSensitive: "Contiene",
                filterLessThan: "Menos que",
                filterLessThanOrEqualTo: "Menos que o igual a",
                filterMode: "Modo de filtro: {filterType}",
                filterNotEmpty: "No vacio",
                filterNotEquals: "No iguales",
                filterStartsWith: "Empieza con",
                filterWeakEquals: "Iguales",
                filteringByColumn:
                  "Filtrando por {column} - {filterType} - {filterValue}",
                goToFirstPage: "Ir a la primera página",
                goToLastPage: "Ir a la última página",
                goToNextPage: "Ir a la página siguiente",
                goToPreviousPage: "Regresar a la pagina anterior",
                grab: "Agarrar",
                groupByColumn: "Agrupar por {column}",
                groupedBy: "Agrupado por",
                hideAll: "Ocultar todo",
                hideColumn: "Ocultar {column}",
                max: "Máximo",
                min: "Mínimo",
                move: "Mover",
                noRecordsToDisplay: "No hay registros para mostrar",
                noResultsFound: "No se encontraron resultados",
                of: "de",
                or: "o",
                pinToLeft: "Anclar a la izquierda",
                pinToRight: "Anclar a la derecha",
                resetColumnSize: "Resetear tamaño de columna",
                resetOrder: "Resetar orden",
                rowActions: "Acciones de fila",
                rowNumber: "#",
                rowNumbers: "Números de fila",
                rowsPerPage: "Filas por página",
                save: "Guardar",
                search: "Buscar",
                select: "Seleccionar",
                selectedCountOfRowCountRowsSelected:
                  "{selectedCount} de {rowCount} fila(s) seleccionada(s)",
                showAll: "Mostrar todo",
                showAllColumns: "Mostrar todas las columnas",
                showHideColumns: "Mostrar/ocultar columnas",
                showHideFilters: "Mostrar/ocultar filtros",
                showHideSearch: "Mostrar/ocultar búsqueda",
                sortByColumnAsc: "Ordenar por {column} ascendente",
                sortByColumnDesc: "Ordenar por {column} descendente",
                sortedByColumnAsc: "Ordenar por {column} ascendente",
                sortedByColumnDesc: "Ordenar por {column} descendente",
                thenBy: ", despues por ",
                toggleDensity: "Alternar densidad",
                toggleFullScreen: "Alternar pantalla completa",
                toggleSelectAll: "Alternar seleccionar todo",
                toggleSelectRow: "Alternar seleccionar fila",
                toggleVisibility: "Alternar visibilidad",
                ungroupByColumn: "Desagrupar por {column}",
                unpin: "Desanclar",
                unpinAll: "Desanclar todo",
                unsorted: "Sin ordenar",
              }}
            />
          </Card.Body>
        </Card>
      ) : (
        <h2>Renderizando...</h2>
      )}
    </>
  );
};

export default Servicios;
