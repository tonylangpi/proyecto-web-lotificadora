"use client";
import { Form, Button, Row, Col, Card, Modal } from "react-bootstrap";
import { Toaster, toast } from "sonner";
import { MaterialReactTable } from "material-react-table";
import { useRouter } from "next/navigation";
import { get, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import useSWR from "swr";
import DeleteIcon from "@mui/icons-material/Delete";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import {
  createDetallesFactura,
  DeleteDetalles,
} from "../../services/moduloFacturas.js";
const DetallesFacturas = ({ idEncabezado }) => {
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState(false);
  const changeInputs = () => setInputs(true);
  const handleClose = () => setShow(false); //cierra modal de creacion de usuarios
  const handleShow = () => setShow(true); //abre modal de creacion de usuarios
  const router = useRouter();
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}facturas/facturasdetalle/${idEncabezado}`,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    isValid,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      idReciboGastoEncabezado: idEncabezado ? idEncabezado : "",
      idServicio: 0,
      descripcion: "",
      tipoServicio: "",
      kwt: "",
      tarifa: "",
      cargomensual: "",
      alumbrado: "",
      cuota: "",
    },
  });
  const columns = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "idDetalle", //simple recommended way to define a column
        header: "ID",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        enableHiding: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "descripcion", //simple recommended way to define a column
        header: "servicio",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        enableHiding: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "cuota",
        header: "cuota",
        size: 50,
        Header: <i style={{ color: "blue" }}>Cuota</i>,
      },
    ],
    []
  );
  const columnsServicios = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "idServicio", //simple recommended way to define a column
        header: "ID",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        enableHiding: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "descripcion", //simple recommended way to define a column
        header: "servicio",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        enableHiding: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "cuotaBase", //simple recommended way to define a column
        header: "cuota",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        enableHiding: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "Estado", //simple recommended way to define a column
        header: "Estado",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        enableHiding: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "TipoServicio", //simple recommended way to define a column
        header: "TipoServicio",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        enableHiding: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
    ],
    []
  );
  const guardar = handleSubmit(async (data) => {
    try {
      if(data.cuota == 0){
        toast("la cuota no puede ser 0")
      }else{
        const res = await createDetallesFactura(data);
        toast(res?.message);
        reset();
        mutate();
      }
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
          <Modal.Title>Selecciona un servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MaterialReactTable
            columns={columnsServicios}
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
            data={data?.servicios ? data.servicios : []}
            renderRowActions={({ row, table }) => (
              <div className="d-flex p-2">
                <Button
                  className="btn btn-danger"
                  onClick={async () => {
                    setValue("idServicio", row.getValue("idServicio"));
                    setValue("descripcion", row.getValue("descripcion"));
                    setValue("tipoServicio", row.getValue("TipoServicio"));
                    if (row.getValue("TipoServicio") == "FIJO") {
                      setValue("cuota", row.getValue("cuotaBase"));
                    }
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
      <div className="row">
        <div className="col-md-5">
          <Card className="m-3">
            <Card.Header>INGRESO DE DETALLES FACTURA</Card.Header>
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
                          message:
                            "El idReciboGastoEncabezado de la vivienda es requerido",
                        },
                      })}
                    />
                    {errors.idReciboGastoEncabezado && (
                      <span className="text-danger">
                        {errors.idReciboGastoEncabezado.message}
                      </span>
                    )}
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridservicio">
                    <Form.Label>elige un servicio</Form.Label>
                    <Button variant="primary" onClick={handleShow}>
                      Seleccionar
                    </Button>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridCodigoServicio">
                    <Form.Label>ID del servicio </Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      readOnly
                      {...register("idServicio", {
                        required: {
                          value: true,
                          message: "El idServicio de la vivienda es requerido",
                        },
                      })}
                    />
                    {errors.idServicio && (
                      <span className="text-danger">
                        {errors.idServicio.message}
                      </span>
                    )}
                  </Form.Group>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDescripcion">
                      <Form.Label>Descripcion servicio</Form.Label>
                      <Form.Control
                        type="text"
                        disabled
                        readOnly
                        {...register("descripcion", {
                          required: {
                            value: true,
                            message: "La descripcion del servicio es requerida",
                          },
                        })}
                      />
                      {errors.descripcion && (
                        <span className="text-danger">
                          {errors.descripcion.message}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDescripcion">
                      <Form.Label>Tipo Servicio</Form.Label>
                      <Form.Control
                        type="text"
                        disabled
                        readOnly
                        {...register("tipoServicio", {
                          required: {
                            value: true,
                            message: "el tipoServicio  es requerida",
                          },
                        })}
                      />
                      {errors.tipoServicio && (
                        <span className="text-danger">
                          {errors.tipoServicio.message}
                        </span>
                      )}
                    </Form.Group>
                  </Row>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridVerificar">
                    <Button
                      variant="primary"
                      onClick={() => {
                        
                          let serviciodesc = getValues("descripcion");
                        const keywords = [
                          "electrica",
                          "luz",
                          "Electricidad",
                          "LUZ",
                          "ELECTRICA",
                          "ENERGIA",
                          "ELECTRICIDAD",
                          "Energia",
                          "Electrica"
                        ];
                        const showInputs = keywords.some((keyword) =>
                        serviciodesc.includes(keyword)
                        );
                        showInputs ? changeInputs() : setInputs(false);
                      }}
                    >
                      Verificar Servicio
                    </Button>
                  </Form.Group>
                </Row>
                {inputs ? (
                  <>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridkwh">
                        <Form.Label>Total kwh</Form.Label>
                        <Form.Control
                          type="text"
                          {...register("kwt", {
                            required: {
                              value: true,
                              message: "Los kwt son requeridos",
                            },
                            pattern: {
                              value: /^[0-9.]+$/,
                              message: "Telefono no válido, solo numeros",
                            },
                          })}
                        />
                        {errors.kwt && (
                          <span className="text-danger">
                            {errors.kwt.message}
                          </span>
                        )}
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridTarifa">
                        <Form.Label>Tarifa Q/kwh</Form.Label>
                        <Form.Control
                          type="text"
                          {...register("tarifa", {
                            required: {
                              value: true,
                              message: "Los tarifa son requeridos",
                            },
                            pattern: {
                              value: /^[0-9.]+$/,
                              message: "Tarifa no válido, solo numeros",
                            },
                          })}
                        />
                        {errors.tarifa && (
                          <span className="text-danger">
                            {errors.tarifa.message}
                          </span>
                        )}
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridCargoMensual">
                        <Form.Label>Cargo mensual con IVA</Form.Label>
                        <Form.Control
                          type="text"
                          {...register("cargomensual", {
                            required: {
                              value: true,
                              message: "El cargo mensual es requeridos",
                            },
                            pattern: {
                              value: /^[0-9.]+$/,
                              message: "cargo mensual no válido, solo numeros",
                            },
                          })}
                        />
                        {errors.cargomensual && (
                          <span className="text-danger">
                            {errors.cargomensual.message}
                          </span>
                        )}
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridTasa">
                        <Form.Label>Tasa de alumbrado publico</Form.Label>
                        <Form.Control
                          type="text"
                          {...register("alumbrado", {
                            required: {
                              value: true,
                              message: "El alumbrado tasa es requeridos",
                            },
                            pattern: {
                              value: /^[0-9.]+$/,
                              message:
                                "valor de alumbrado no válido, solo numeros",
                            },
                          })}
                        />
                        {errors.alumbrado && (
                          <span className="text-danger">
                            {errors.alumbrado.message}
                          </span>
                        )}
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridCalcular">
                        <Button
                          variant="primary"
                          onClick={() => {
                            let kwt = parseInt(getValues("kwt"));
                            let tarifa = parseFloat(getValues("tarifa"));
                            let cargo = parseFloat(getValues("cargomensual"));
                            let alumbrado = parseFloat(getValues("alumbrado"));
                            let consumo = isNaN(kwt * tarifa + cargo + alumbrado) ? 0 : kwt * tarifa + cargo + alumbrado;
                            setValue("cuota",consumo);
                          }}
                        >
                          Calcular
                        </Button>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridDescripcion">
                        <Form.Label>Cuota</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          {...register("cuota", {
                            required: {
                              value: true,
                              message: "Los cuota son requeridos",
                            },
                          })}
                        />
                        {errors.cuota && (
                          <span className="text-danger">
                            {errors.cuota.message}
                          </span>
                        )}
                      </Form.Group>
                    </Row>
                  </>
                ) : getValues("tipoServicio") == "FIJO" ? (
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDescripcion">
                      <Form.Label>Cuota</Form.Label>
                      <Form.Control
                        type="text"
                        {...register("cuota", {
                          required: {
                            value: true,
                            message: "Los cuota son requeridos",
                          },
                        })}
                      />
                      {errors.cuota && (
                        <span className="text-danger">
                          {errors.cuota.message}
                        </span>
                      )}
                    </Form.Group>
                  </Row>
                ) : (<Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDescripcion">
                      <Form.Label>Cuota</Form.Label>
                      <Form.Control
                        type="text"
                        {...register("cuota", {
                          required: {
                            value: true,
                            message: "Los cuota son requeridos",
                          },
                        })}
                      />
                      {errors.cuota && (
                        <span className="text-danger">
                          {errors.cuota.message}
                        </span>
                      )}
                    </Form.Group>
                  </Row>)}
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
        </div>
        <div className="col-md-7">
          <Card className="m-3">
            <Card.Header>DETALLES FACTURA</Card.Header>
            <Card.Body>
              <MaterialReactTable
                columns={columns}
                enableRowActions
                enableDensityToggle={false}
                initialState={{
                  density: "compact",
                  columnVisibility: { idDetalle: false },
                }}
                muiTableProps={{
                  sx: {
                    border: "1px solid rgba(81, 81, 81, 1)",
                  },
                }}
                data={data?.detalles ? data.detalles : []}
                renderRowActions={({ row, table }) => (
                  <div className="d-flex p-2">
                    <Button
                      className="btn btn-danger"
                      onClick={async () => {
                        if (!confirm(`Deseas eliminar el detalle`)) {
                          return;
                        }

                        let res = await DeleteDetalles(
                          row.getValue("idDetalle")
                        );
                        toast(res?.message, { style: { background: "red" } });
                        mutate();
                      }}
                    >
                      <DeleteIcon />
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
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DetallesFacturas;
