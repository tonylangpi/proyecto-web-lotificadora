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
import {createPropietarios, editPropietarios} from '../../services/moduloPropiedades.js'
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
      email: "",
      telefono: "",
      direccion: "",
      idUsuario: idUsuario,
      dpi: "",
    },
  });
  const handleSaveRowEdits = async ({ exitEditingMode,values }) => {
    //funciona que captura datos y actualiza los datos a la BD mediante la api
    let res = await editPropietarios(values); 
    toast(res?.message, { style: { background: "yellow" } });
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
        muiTableBodyCellEditTextFieldProps:{
          required: true
        },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, 

      },
      {
        accessorKey: "nombre", 
        header: "Nombre",
        muiTableBodyCellEditTextFieldProps:{
          required: true,
          minLength:2,
          maxLength:100
        },
        Header: <i style={{ color: "blue" }}>Nombres</i>, 
      },
      {
        accessorKey: "apellido", 
        header: "Apellidos",
        Header: <i style={{ color: "yellos" }}>Apellidos</i>, 
      },
      {
        accessorKey: "correo", 
        header: "Correo",
        Header: <i style={{ color: "green" }}>Correo</i>, 
      },
      {
        accessorKey: "telefono", 
        header: "Telefono",
        Header: <i style={{ color: "blue" }}>Telefono</i>, 
      },
      {
        accessorKey: "direccion", 
        header: "Direccion",
        Header: <i style={{ color: "red" }}>Direccion</i>, 
      },
      {
        accessorKey: "dpi", 
        header: "Dpi",
        enableEditing: true, 
        enableSorting: true,
        muiTableHeadCellProps: { sx: { color: "green" } }, 
        Cell: ({ renderedCellValue }) => (
          <strong>{renderedCellValue || "-------"}</strong>
        ), 
      },
    ],
    []
  );
  //configuracion del envio de datos post crear un PROPIETARIO NUEVO
  const enviar = handleSubmit(async (data) => {
    try {
      const res = await createPropietarios(data);
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
          <Modal.Title>Datos de propietario nuevo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={enviar}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridNombres">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Javier Jose"
                  {...register("nombre", {
                    required: {
                      value: true,
                      message: "Nombres requeridos",
                    },
                    maxLength: 100,
                    minLength: 2,
                  })}
                />
                {errors.nombre && (
                  <span className="text-danger">{errors.nombre.message}</span>
                )}
                {errors.nombre?.type === "maxLength" && (
                  <span className="text-danger">
                    Los nombres no deben superar los 100 caracteres
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
                  {...register("apellido", {
                    required: {
                      value: true,
                      message: "Apellidos requeridos",
                    },
                    maxLength: 100,
                    minLength: 2,
                  })}
                />
                  {errors.apellido && (
                  <span className="text-danger">{errors.apellido.message}</span>
                )}
                {errors.apellido?.type === "maxLength" && (
                  <span className="text-danger">
                    Los apellidos no deben superar los 100 caracteres
                  </span>
                )}
                {errors.apellido?.type === "minLength" && (
                  <span className="text-danger">
                    El apellido debe ser mayor a 2 caracteres
                  </span>
                )}
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCorreo">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="asdfdf@gmail.com"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Correo es requerido",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Correo no válido",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridTelefono">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="5523-1135"
                  name="telefono"
                  {...register("telefono", {
                    required: {
                      value: true,
                      message: "Telefono requeridos sin extension ni guiones",
                    },
                    maxLength: 8,
                    minLength: 8,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Telefono no válido, solo numeros",
                    },
                  })}
                />
                {errors.telefono && (
                  <span className="text-danger">{errors.telefono.message}</span>
                )}
                {errors.telefono?.type === "maxLength" && (
                  <span className="text-danger">
                    el numero de telefono solo es de 8 digitos
                  </span>
                )}
                {errors.telefono?.type === "minLength" && (
                  <span className="text-danger">
                    El numero de telefono debe tener minimo 8 caracteres
                  </span>
                )}
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridDireccion">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="zona xxxd"
                  style={{ height: "100px" }}
                  {...register("direccion", {
                    required: {
                      value: true,
                      message: "Direccion requerida",
                    },
                    maxLength: 250,
                    minLength: 5,
                  })}
                />
                 {errors.direccion && (
                  <span className="text-danger">{errors.direccion.message}</span>
                )}
                {errors.direccion?.type === "maxLength" && (
                  <span className="text-danger">
                    La direccion tiene limite de 250 caracteres
                  </span>
                )}
                {errors.direccion?.type === "minLength" && (
                  <span className="text-danger">
                    la direccion debe tener al menos 5 caracteres
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDpi">
                <Form.Label>DPI</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="3371309810822"
                  name="dpi"
                  {...register("dpi", {
                    required: {
                      value: true,
                      message: "dpi requerido y sin guiones ni espacios",
                    },
                    maxLength: 20,
                    minLength: 13,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "DPI no válido, solo numeros",
                    },
                  })}
                />
                  {errors.dpi && (
                  <span className="text-danger">{errors.dpi.message}</span>
                )}
                {errors.dpi?.type === "maxLength" && (
                  <span className="text-danger">
                    La dpi tiene limite de 20 caracteres
                  </span>
                )}
                {errors.dpi?.type === "minLength" && (
                  <span className="text-danger">
                    el dpi debe tener al menos 13 caracteres
                  </span>
                )}
              </Form.Group>
            </Row>
          <Button variant="primary" type="submit">Agregar</Button>
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
