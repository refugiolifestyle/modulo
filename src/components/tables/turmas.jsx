import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { useEffect, useState } from 'react';
import { useModulosService } from '../../services/useModulosService';
import { useSemestresService } from '../../services/useSemestresService';
import { useDiasService } from '../../services/useDiasService';
import { useAnosService } from '../../services/useAnosService';

const dataColumns = [
  'Nome',
  'Módulo',
  'Ano',
  'Semestre',
  'Dia',
  'Horário',
  'Professores',
  'Monitores',
  'Local'
];

export default function TableTurmas({ turmas, loading, columnsExtras, columnsDefault }) {
  const modulos = useModulosService()
  const semestres = useSemestresService()
  const dias = useDiasService()
  const anos = useAnosService()
  const [visibleColumns, setVisibleColumns] = useState(columnsDefault ? columnsDefault : ['Nome', 'Módulo', 'Ano', 'Semestre', 'Dia', 'Professores']);
  const [countRealRows, setCountRealRows] = useState(0);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nome: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    modulo: { value: null, matchMode: FilterMatchMode.IN },
    ano: { value: null, matchMode: FilterMatchMode.IN },
    semestre: { value: null, matchMode: FilterMatchMode.IN },
    dia: { value: null, matchMode: FilterMatchMode.IN },
    professores: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    monitores: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    local: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
  });

  useEffect(() => {
    setCountRealRows(turmas ? turmas.length : 0)
  }, [turmas])

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  return <DataTable
    value={turmas}
    onValueChange={data => setCountRealRows(data?.length || 0)}
    emptyMessage='Nenhuma turma encontrada'
    loading={loading}
    header={<div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type='search' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Pesquisar por..." />
        </span>
      </div>
      <span>Total de registros: {countRealRows} {countRealRows === 1 ? "turma" : "turmas"}</span>
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
    multiSortMeta={[{ field: 'nome', order: 1 }]}
    sortOrder={1}
    sortMode="multiple"
    removableSort
    dataKey="uuid"
    filters={filters}>
    {visibleColumns.includes('Nome')
      ? <Column
        key="nome"
        field="nome"
        filterField="nome"
        filter
        filterPlaceholder="Filtrar por Nome"
        header="Nome"
        sortable />
      : null}
    {visibleColumns.includes('Módulo')
      ? <Column
        key="modulo"
        field="modulo"
        filter
        filterField="modulo"
        filterElement={options => <MultiSelect filter value={options.value} options={modulos} onChange={(e) => options.filterCallback(e.value)} placeholder="Filtrar por Módulo" className="p-column-filter" />}
        showFilterMatchModes={false}
        header="Módulo"
        sortable />
      : null}
    {visibleColumns.includes('Ano')
      ? <Column
        key="ano"
        field="ano"
        filter
        filterField="ano"
        filterElement={options => <MultiSelect filter value={options.value} options={anos} onChange={(e) => options.filterCallback(e.value)} placeholder="Filtrar por Ano" className="p-column-filter" />}
        showFilterMatchModes={false}
        header="Ano"
        sortable />
      : null}
    {visibleColumns.includes('Semestre')
      ? <Column
        key="semestre"
        field="semestre"
        filter
        filterField="semestre"
        filterElement={options => <MultiSelect filter value={options.value} options={semestres} onChange={(e) => options.filterCallback(e.value)} placeholder="Filtrar por Semestre" className="p-column-filter" />}
        showFilterMatchModes={false}
        header="Semestre"
        sortable />
      : null}
    {visibleColumns.includes('Dia')
      ? <Column
        key="dia"
        field="dia"
        filter
        filterField="dia"
        filterElement={options => <MultiSelect filter value={options.value} options={dias} onChange={(e) => options.filterCallback(e.value)} placeholder="Filtrar por Dia" className="p-column-filter" />}
        showFilterMatchModes={false}
        header="Dia"
        sortable />
      : null}

    {visibleColumns.includes('Horário')
      ? <Column
        key="horario"
        field="horario"
        header="Horário" />
      : null}

    {visibleColumns.includes('Professores')
      ? <Column
        sortable
        key="professores"
        field="professores"
        filterField="professores"
        filter
        filterPlaceholder="Filtrar por Professores"
        header="Professores"
        body={linha => linha.professores.join(', ')} />
      : null}
    {visibleColumns.includes('Monitores')
      ? <Column
        key="monitores"
        field="monitores"
        filterField="monitores"
        filter
        filterPlaceholder="Filtrar por Monitores"
        header="Monitores"
        sortable 
        body={linha => linha.monitores.join(', ')} />
      : null}
    {visibleColumns.includes('Local')
      ? <Column
        key="local"
        field="local"
        filterField="local"
        filter
        filterPlaceholder="Filtrar por Local"
        header="Local"
        sortable />
      : null}
    {
      columnsExtras
        ? columnsExtras
        : null
    }
  </DataTable>
}