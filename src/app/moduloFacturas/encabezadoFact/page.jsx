"use client";
import React, { useCallback, useMemo } from "react";
import { Toaster, toast } from "sonner";
import { useSession } from "next-auth/react";
import { MaterialReactTable } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Form, Col, Row, Button, Modal, Card } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createPropietarios,
  editPropietarios,
  updateStatusPropietarios,
} from "../../../services/moduloPropiedades.js";
import useSWR from "swr";

const EncabezadoFactura = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false); //cierra modal de creacion de usuarios
    const handleShow = () => setShow(true); //abre modal de creacion de usuarios
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
    } = useForm({
      mode: "onChange",
      defaultValues: {
        Mes: 0,
        idVivienda: "",
        Estado: 0,
        idUsuario: idUsuario
      },
    });
  
    const handleSaveRowEdits = async ({ exitEditingMode, values }) => {
      //funciona que captura datos y actualiza los datos a la BD mediante la api
      if (
        values.idPropietario === "" ||
        values.nombre === "" ||
        values.dpi === "" ||
        values.direcion === "" ||
        values.correo === "" ||
        values.telefono === "" ||
        values.apellido === ""
      ) {
        toast("Faltan campos, no puedes enviar nada vacio", {
          style: { background: "red" },
        });
      } else {
        const res = await editPropietarios(values);
        toast(res?.message);
        mutate();
        exitEditingMode();
      }
    };
  
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
        }
      ],
      []
    );
  
    //configuracion del envio de datos post crear un PROPIETARIO NUEVO
    const enviar = handleSubmit(async (data) => {
      try {
        // const res = await createPropietarios(data);
        // toast(res?.message);
        // mutate();
        // reset();
        console.log(data);
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
            <Modal.Title>Datos encabezado Nuevo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={enviar}>
              <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPropietario">
                <Form.Label>SELECCIONA UN MES</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="propietarios"
                  {...register("Mes")}
                >
                    <option value={1}>ENERO</option>
                    <option value={2}>FEBRERO</option>
                    <option value={3}>MARZO</option>
                    <option value={4}>ABRIL</option>
                    <option value={5}>MAYO</option>
                    <option value={6}>JUNIO</option>
                    <option value={7}>JULIO</option>
                    <option value={8}>AGOSTO</option>
                    <option value={9}>SEPTIEMBRE</option>
                    <option value={10}>OCTUBRE</option>
                    <option value={11}>NOVIEMBRE</option>
                    <option value={12}>DICIEMBRE</option>
                </Form.Select>
              </Form.Group>
              </Row>
              <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPropietario">
                <Form.Label>SELECCIONA LA VIVIENDA</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="propietarios"
                  {...register("idVivienda")}
                >
                    <option value={1}>ENERO</option>
                    <option value={2}>FEBRERO</option>
                </Form.Select>
              </Form.Group>
              </Row>
              <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPropietario">
                <Form.Label>ESTADO FACTURA</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="propietarios"
                  {...register("Estado")}
                >
                    <option value={1}>PAGADA</option>
                    <option value={2}>NO PAGADA</option>
                </Form.Select>
              </Form.Group>
              </Row>
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
        <h5>Facturas</h5>
        {data ? (
          <Card className="mt-2">
            <Card.Body>
              <MaterialReactTable
                columns={columns}
                enableRowActions
                enableDensityToggle={false}
                initialState={{ density: "compact", columnVisibility: { CodigoEncabezado: false } }}
                muiTableProps={{
                  sx: {
                    border: "1px solid rgba(81, 81, 81, 1)",
                  },
                }}
                data={data ? data : []}
                onEditingRowSave={handleSaveRowEdits}
                renderRowActions={({ row, table }) => (
                  <div className="d-flex p-2">
                    <Button
                      className="btn btn-danger"
                      onClick={async () => {
                        if (
                          !confirm(
                            `Deseas cambiar el estado: ${row.getValue("nombre")}`
                          )
                        ) {
                          return;
                        }
                        let res = await updateStatusPropietarios(
                          row.getValue("idPropietario")
                        );
                        toast(res?.message, { style: { background: "red" } });
                        mutate();
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                    <Button
                      className="btn btn-warning"
                      onClick={() => {
                        table.setEditingRow(row);
                      }}
                    >
                      <EditIcon />
                    </Button>
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
          <h5>renderizando datos</h5>
        )}
      </>
    );
}

export default EncabezadoFactura