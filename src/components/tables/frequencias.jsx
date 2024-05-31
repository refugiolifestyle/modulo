import { useEffect, useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { useTurmasService } from '../../services/useTurmasService';

const dataColumns = [
  'Turma',
  'Data',
  'Presenças',
  'Faltas'
];

export default function TableFrequencias({ frequencias, loading, columnsExtras, columnsDefault }) {
  const { turmas } = useTurmasService()
  const [visibleColumns, setVisibleColumns] = useState(columnsDefault ? columnsDefault : ['Turma', 'Data', 'Presenças', 'Faltas']);
  const [countRealRows, setCountRealRows] = useState(0);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    turma: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    data: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  useEffect(() => {
    setCountRealRows(frequencias ? frequencias.length : 0)
  }, [frequencias])

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  return <DataTable
    value={frequencias}
    onValueChange={data => setCountRealRows(data?.length || 0)}
    emptyMessage='Nenhuma frequência encontrada'
    loading={loading}
    header={<div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type='search' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Pesquisar por..." />
        </span>
      </div>
      <span>Total de registros: {countRealRows} {countRealRows === 1 ? "frequência" : "frequências"}</span>
      <MultiSelect
        value={visibleColumns}
        options={dataColumns}
        placeholder="Colunas visíveis"
        className="w-full max-w-xs"
        onChange={event => setVisibleColumns(event.value)}
        maxSelectedLabels={3}
        display="chip" />
    </div>}
    paginator
    rows={15}
    rowsPerPageOptions={[5, 15, 30, 50, 100]}
    multiSortMeta={[{ field: 'data', order: 1 }]}
    sortOrder={1}
    sortMode="multiple"
    removableSort
    dataKey="uuid"
    filters={filters}>
    {visibleColumns.includes('Turma')
      ? <Column
        key="turmas"
        field="turmas"
        filter
        filterField="turmas"
        filterElement={options => <MultiSelect filter value={options.value} options={turmas} onChange={(e) => options.filterCallback(e.value)} placeholder="Filtrar por Turma" className="p-column-filter" />}
        showFilterMatchModes={false}
        header="Turma"
        sortable />
      : null}
    {visibleColumns.includes('Data')
      ? <Column
        key="data"
        field="data"
        filter
        filterField="data"
        filterElement={options => <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value)} placeholder="Filtrar por Data" className="p-column-filter" />}
        showFilterMatchModes={false}
        header="Data"
        sortable />
      : null}
    {visibleColumns.includes('Presenças')
      ? <Column
        key="presencas"
        field="alunos"
        header="Presenças" />
      : null}
    {visibleColumns.includes('Faltas')
      ? <Column
        key="faltas"
        field="alunos"
        header="Faltas" />
      : null}
    {
      columnsExtras
        ? columnsExtras
        : null
    }
  </DataTable>
}