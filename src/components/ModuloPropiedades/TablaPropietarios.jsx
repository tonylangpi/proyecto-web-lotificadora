"use client";
import React, { useMemo } from "react";
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

export default function TablaPropietarios({ datos }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      direccion: "",
      idUsuario: idUsuario,
      dpi: "",
    },
  });
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    //funciona que captura datos y actualiza los datos a la BD mediante la api
    let res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}categorias/updateCategoria`,
      values
    );
    toast(res.data?.message, { style: { background: "yellow" } });
    router.refresh();
    exitEditingMode();
  };

  const columns = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "idPropietario", //simple recommended way to define a column
        header: "ID",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "nombre", //alternate way
        header: "Nombre",
        Header: <i style={{ color: "blue" }}>Nombres</i>, //optional custom markup
      },
      {
        accessorKey: "apellido", //alternate way
        header: "Apellidos",
        Header: <i style={{ color: "yellos" }}>Apellidos</i>, //optional custom markup
      },
      {
        accessorKey: "correo", //alternate way
        header: "Correo",
        Header: <i style={{ color: "green" }}>Correo</i>, //optional custom markup
      },
      {
        accessorKey: "telefono", //alternate way
        header: "Telefono",
        Header: <i style={{ color: "blue" }}>Telefono</i>, //optional custom markup
      },
      {
        accessorKey: "direccion", //alternate way
        header: "Direccion",
        Header: <i style={{ color: "red" }}>Direccion</i>, //optional custom markup
      },
      {
        accessorKey: "dpi", //simple recommended way to define a column
        header: "Dpi",
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <strong>{renderedCellValue || "-------"}</strong>
        ), //optional custom cell render
      },
    ],
    []
  );
  //configuracion del envio de datos post crear un PROPIETARIO NUEVO
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}productos/createProducto`,
        data
      );
      toast(res.data?.message);
      reset();
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
          <Modal.Title>Datos de propietario nuevo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridNombres">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  type="text"
                  {...register("nombre", {
                    required: {
                      value: true,
                      message: "Nombres requerido",
                    },
                    maxLength: 250,
                    minLength: 2,
                  })}
                  placeholder="Javier Jose"
                  name="nombre"
                />
                {errors.nombre && (
                  <span className="text-danger">{errors.nombre.message}</span>
                )}
                {errors.nombre?.type === "maxLength" && (
                  <span className="text-danger">
                    El nombre no debe superar los 100 caracteres
                  </span>
                )}
                {errors.nombre?.type === "minLength" && (
                  <span className="text-danger">
                    El nombre debe ser mayor a 2 caracteres
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridApellidos">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Estrada Lopez"
                  name="apellidos"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCorreo">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="asdfdf@gmail.com"
                  name="correo"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridTelefono">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="5523-1135"
                  name="telefono"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridDireccion">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ZONA XXXD"
                  name="direccion"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDpi">
                <Form.Label>DPI</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="3371309810822"
                  name="dpi"
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary">Agregar</Button>
        </Modal.Footer>
      </Modal>
      <MaterialReactTable
        columns={columns}
        enableRowActions
        data={datos}
        onEditingRowSave={handleSaveRowEdits}
        renderRowActions={({ row, table }) => (
          <div className="d-flex p-2">
            <Button
              className="btn btn-danger"
              onClick={async () => {
                if (
                  !confirm(
                    `Deseas eliminar la categoria: ${row.getValue(
                      "descripcion"
                    )}`
                  )
                ) {
                  return;
                }
                let res = await axios.delete(
                  `${
                    process.env.NEXT_PUBLIC_API_URL
                  }categorias/deleteCategoria/${row.getValue("idCategoria")}`
                );
                if (res.status === 204) {
                  toast("Categoria Borrada", { style: { background: "red" } });
                  router.refresh();
                }
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
    </>
  );
}
