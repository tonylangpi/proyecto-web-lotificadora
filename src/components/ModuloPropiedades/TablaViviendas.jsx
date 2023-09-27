"use client";
import React, { useCallback, useMemo } from "react";
import { Toaster, toast } from "sonner";
import { useSession } from "next-auth/react";
import { MaterialReactTable } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Form, Col, Row, Button, Modal } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createViviendas,
  updateStatusPropietarios,
} from "../../services/moduloPropiedades.js";
export default function TablaViviendas({ datos, propie }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false); //cierra modal de creacion de usuarios
  const handleShow = () => setShow(true); //abre modal de creacion de usuarios
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
      Codigo: "",
      descripcion: "",
      CantidadHabitantes: 0,
      medidas: "",
      idPropietario: 0,
      idUsuario: idUsuario,
    },
  });

  const handleSaveRowEdits = async ({ exitEditingMode, values, row }) => {
     // datos[row.index] = values; 
      console.log(row.index); 
  };

  const columns = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "codigo", //simple recommended way to define a column
        header: "CODIGO VIVIENDA",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "descripcion",
        header: "Descripcion de la vivienda",
        Header: <i style={{ color: "blue" }}>Descripcion de la vivienda</i>,
      },
      {
        accessorKey: "CantidadHabitantes",
        header: "CantidadHabitantes",
        Header: <i style={{ color: "yellos" }}>Cantidad de Habitantes</i>,
      },
      {
        accessorKey: "medidas",
        header: "Medidas",
        Header: <i style={{ color: "green" }}>Medidas</i>,
      },
      {
        accessorKey: "NombreCompleto",
        header: "Nombre de Propietario",
        Header: <i style={{ color: "blue" }}>Propietario</i>,
      },
      {
        accessorKey: "idPropietario",
        header: "Codigo Propietario",
        Header: <i style={{ color: "red" }}>Codigo Propietario</i>,
      },
    ],
    []
  );

  //configuracion del envio de datos post crear un PROPIETARIO NUEVO
    const enviar = handleSubmit(async (data) => {
      try {
        const res = await createViviendas(data);
        toast(res?.message);
        reset();
        handleClose();
        router.refresh();
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
          <Modal.Title>Datos de la vivienda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={enviar}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCodigo">
                <Form.Label>Codigo Vivienda</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="10-45"
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
                  placeholder="vivienda con 3 habitaciones 2 baños ...etc..."
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
                  {propie.map((cat, index) => (
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
      <MaterialReactTable
        columns={columns}
        enableRowActions
        data={datos}
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
                router.refresh();
              }}
            >
              <DeleteIcon />
            </Button>
            <Button
              className="btn btn-warning"
              onClick={() => {
               router.push(`/moduloPropiedades/viviendas/${row.getValue("codigo")}`); 
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
    </>
  );
}
