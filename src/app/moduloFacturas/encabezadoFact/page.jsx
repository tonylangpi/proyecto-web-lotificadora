"use client";
import React, { useMemo } from "react";
import { Toaster, toast } from "sonner";
import { useSession } from "next-auth/react";
import { MaterialReactTable } from "material-react-table";
import SettingsIcon from "@mui/icons-material/Settings";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import {
  Form,
  Col,
  Row,
  Button,
  Modal,
  Card,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  createFacturasEncabezado,
  DeleteEncabezados,
} from "../../../services/moduloFacturas.js";
import useSWR from "swr";

const EncabezadoFactura = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false); //cierra modal de creacion de usuarios
  const handleShow = () => setShow(true); //abre modal de creacion de usuarios
  const router = useRouter();
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}facturas/all`,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const { data: session } = useSession();
  let idUsuario = session?.user?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      Mes: 0,
      idVivienda: "",
      Estado: 0,
      idUsuario: idUsuario,
    },
  });

  const columns = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "CodigoEncabezado", //simple recommended way to define a column
        header: "ID",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        enableHiding: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "Propietario",
        header: "Propietario",
        size: 50,
        Header: <i style={{ color: "blue" }}>Propietario</i>,
      },
      {
        accessorKey: "Mes",
        header: "Mes",
        size: 50,
        Header: <i style={{ color: "yellos" }}>Mes</i>,
      },
      {
        accessorKey: "EstadoPago",
        header: "EstadoPago",
        size: 50,
        Header: <i style={{ color: "green" }}>Estado Factura</i>,
      },
      {
        accessorKey: "CodVivienda",
        header: "CodVivienda",
        size: 50,
        Header: <i style={{ color: "blue" }}>Vivienda</i>,
      },
      {
        accessorKey: "fecha_recibo",
        header: "fecha_recibo",
        size: 50,
        Header: <i style={{ color: "red" }}>Fecha de Emision</i>,
      },
      {
        accessorKey: "totalRecibo",
        header: "totalRecibo",
        size: 50,
        Header: <i style={{ color: "red" }}>Total a Pagar</i>,
      },
    ],
    []
  );

  const columnsViviendas = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "codigo", //simple recommended way to define a column
        header: "codigo vivienda",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        enableHiding: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "Propietario",
        header: "Propietario",
        size: 50,
        Header: <i style={{ color: "blue" }}>Propietario</i>,
      },
      {
        accessorKey: "EstadoPropietario",
        header: "EstadoPropietario",
        size: 50,
        Header: <i style={{ color: "yellos" }}>Estado del Propietario</i>,
      },
    ],
    []
  );

  //configuracion del envio de datos post crear un PROPIETARIO NUEVO
  const enviar = handleSubmit(async (data) => {
    try {
      const date = new Date();
      const month = date.getMonth() + 1;
      let valores = {
        Mes: month,
        idVivienda: data?.idVivienda,
        Estado: 2,
        idUsuario: data?.idUsuario,
      };
      const res = await createFacturasEncabezado(valores);
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
      <Toaster position="top-center" offset="100px" />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Selecciona una vivienda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MaterialReactTable
            columns={columnsViviendas}
            enableRowActions
            enableDensityToggle={false}
            initialState={{
              density: "compact",
            }}
            muiTableProps={{
              sx: {
                border: "1px solid rgba(81, 81, 81, 1)",
              },
            }}
            data={data?.viviendas ? data?.viviendas : []}
            renderRowActions={({ row, table }) => (
              <div className="d-flex p-2">
                <Button
                  className="btn btn-danger"
                  onClick={async () => {
                    setValue("idVivienda", row.getValue("codigo"));
                    handleClose();
                  }}
                >
                  <OfflinePinIcon />
                </Button>
              </div>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <h5>Facturas Encabezados</h5>
      {data ? (
        <>
          <div className="row">
            <div className="col-md-5">
              <Card className="m-2">
                <Card.Body>
                  <Form onSubmit={enviar}>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridViviendas">
                        <Form.Label>SELECCIONA LA VIVIENDA</Form.Label>
                        <Button variant="primary" onClick={handleShow}>
                          Agregar
                        </Button>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridViviendas">
                        <Form.Label>Codigo de vivienda seleccionada</Form.Label>
                        <Form.Control
                          aria-label="Default select example"
                          name="Viviendas"
                          disabled
                          {...register("idVivienda", {
                            required: {
                              value: true,
                              message: "El codigo de la vivienda es requerido",
                            },
                          })}
                        />
                        {errors.idVivienda && (
                          <span className="text-danger">
                            {errors.idVivienda.message}
                          </span>
                        )}
                      </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit">
                      Agregar
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-7">
              <Card className="mt-3">
                <Card.Body>
                  <MaterialReactTable
                    columns={columns}
                    enableRowActions
                    enableDensityToggle={false}
                    initialState={{
                      density: "compact",
                      columnVisibility: { CodigoEncabezado: false },
                    }}
                    muiTableProps={{
                      sx: {
                        border: "1px solid rgba(81, 81, 81, 1)",
                      },
                    }}
                    data={data?.encabezados ? data?.encabezados : []}
                    renderRowActions={({ row, table }) => (
                      <div className="d-flex p-2">
                        {row.getValue("EstadoPago") == "PAGADA" || "ANULADA" ? (
                          <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                              <Tooltip>
                                <strong>VER</strong>.
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn btn-danger"
                              onClick={async () => {
                                router.push(
                                  `/moduloFacturas/verDetallesFact/${row.getValue(
                                    "CodigoEncabezado"
                                  )}`
                                );
                              }}
                            >
                              <RemoveRedEyeIcon />
                            </Button>
                          </OverlayTrigger>
                        ) : null}
                        {row.getValue("EstadoPago") == "NO PAGADA" ? (
                          <>
                            <OverlayTrigger
                              placement="right"
                              delay={{ show: 250, hide: 400 }}
                              overlay={
                                <Tooltip>
                                  <strong>ANULAR</strong>.
                                </Tooltip>
                              }
                            >
                              <Button
                                className="btn btn-danger"
                                onClick={async () => {
                                  if (
                                    !confirm(
                                      `Deseas anular el esta factura : ${row.getValue(
                                        "CodigoEncabezado"
                                      )}`
                                    )
                                  ) {
                                    return;
                                  }
                                  let res = await DeleteEncabezados(
                                    row.getValue("CodigoEncabezado")
                                  );
                                  toast(res?.message, {
                                    style: { background: "red" },
                                  });
                                  mutate();
                                }}
                              >
                                <HighlightOffIcon />
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="right"
                              overlay={
                                <Tooltip>
                                  <strong>AgregarDetalles</strong>.
                                </Tooltip>
                              }
                            >
                              <Button
                                className="btn btn-warning"
                                onClick={() => {
                                  router.push(
                                    `/moduloFacturas/encabezadoFact/${row.getValue(
                                      "CodigoEncabezado"
                                    )}`
                                  );
                                }}
                              >
                                <SettingsIcon />
                              </Button>
                            </OverlayTrigger>
                          </>
                        ) : null}
                      </div>
                    )}
                    renderTopToolbarCustomActions={() => (
                      <Button
                        onClick={() => {
                          fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}facturas/generarReporte`,
                            {
                              headers: {
                                apiKey: process.env.NEXT_PUBLIC_API_KEY,
                              },
                            }
                          ) // FETCH BLOB FROM IT
                            .then((response) => response.blob())
                            .then((blob) => {
                              // RETRIEVE THE BLOB AND CREATE LOCAL URL
                              var _url = window.URL.createObjectURL(blob);
                              window.open(_url, "_blank").focus(); // window.open + focus
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        Reporte
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
            </div>
          </div>
        </>
      ) : (
        <h5>renderizando datos</h5>
      )}
    </>
  );
};

export default EncabezadoFactura;
