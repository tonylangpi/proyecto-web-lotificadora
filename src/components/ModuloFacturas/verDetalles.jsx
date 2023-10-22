"use client";
import { MaterialReactTable } from "material-react-table";
import { Card, Button} from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import useSWR from "swr";
import {createDetallesFactura, DeleteDetalles}  from "../../services/moduloFacturas.js"

const VerDetalles = ({idEncabezado}) => {
  const router = useRouter();
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}facturas/facturasdetalle/${idEncabezado}`,
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
  return (
    <Card className="m-3">
            <Card.Header>DETALLES FACTURA</Card.Header>
            <Card.Body>
              <MaterialReactTable
                columns={columns}
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
                renderTopToolbarCustomActions={() => (
                <Button variant="primary" onClick={() => router.back()}>
                  Regresar
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
  )
}

export default VerDetalles