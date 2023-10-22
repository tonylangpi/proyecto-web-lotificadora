"use client";
import React, { useMemo } from "react";
import { Toaster, toast } from "sonner";
import { useSession } from "next-auth/react";
import { MaterialReactTable } from "material-react-table";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Button, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import {
 enviarCorreoPropietario
} from "../../services/moduloFacturas.js";
const ModuloFacturas = () => {
  const date = new Date();
  const year = date.getFullYear();
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}facturas/facturasPendientesMes/${year}`,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const columns = useMemo(
    //configuracion de las columnas que vienen en la consulta
    () => [
      {
        accessorKey: "CodigoEncabezado", //simple recommended way to define a column
        header: "CODIGO Encabezado",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "Propietario",
        header: "Descripcion de la vivienda",
        size: 50,
        Header: <i style={{ color: "blue" }}>propietario</i>,
      },
      {
        accessorKey: "correo",
        header: "correo",
        size: 50,
        Header: <i style={{ color: "blue" }}>Correo del propietario</i>,
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
        size: 100,
        Header: <i style={{ color: "green" }}>Estado de Pago</i>,
      },
      {
        accessorKey: "CodVivienda",
        header: "Nombre de Propietario",
        size: 100,
        Header: <i style={{ color: "blue" }}>Numero de casa</i>,
      },
      {
        accessorKey: "fecha_recibo",
        header: "fecha_recibo",
        size: 100,
        Header: <i style={{ color: "red" }}>Fecha de emision del recibo</i>,
      },
      {
        accessorKey: "totalRecibo",
        header: "totalRecibo",
        size: 100,
        Header: <i style={{ color: "red" }}>Total a cancelar</i>,
      },
    ],
    []
  );
  return (
    <>
      <Toaster position="top-center" offset="100px" />
      {data ? (
        <Card className="mt-2">
          <Card.Body>
            <h4>FACTURAS DEL MES ACTUAL PENDIENTES DE PAGO</h4>
            <MaterialReactTable
              columns={columns}
              enableRowActions
              enableDensityToggle={false}
              initialState={{ density: "compact" }}
              muiTableProps={{
                sx: {
                  border: "1px solid rgba(81, 81, 81, 1)",
                },
              }}
              data={data ? data : []}
              renderRowActions={({ row, table }) => (
                <div className="d-flex p-2">
                {row.getValue("totalRecibo") == 0 ? (null):( <Button
                    className="btn btn-danger"
                    onClick={async () => {
                      if (
                        !confirm(
                          `Deseas enviar un correo al propietario: ${row.getValue(
                            "Propietario"
                          )}`
                        )
                      ) {
                        return;
                      }
                      const date = new Date();
                      const month = date.getMonth() + 1;
                      const year = date.getFullYear();
                      let info = {
                        correo: row.getValue("CorreoPropietario"),
                        viviendacod: row.getValue("CodVivienda"),
                        mes:month,
                        year: year
                      };
                      const res = await enviarCorreoPropietario(info);
                      toast(res?.message, { style: { background: "green" } });
                    }}
                  >
                    <ContactMailIcon />
                  </Button>)
                }
                </div>
              )}
              positionActionsColumn="last"
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
        <h5>Cargando...</h5>
      )}
    </>
  );
};

export default ModuloFacturas;
