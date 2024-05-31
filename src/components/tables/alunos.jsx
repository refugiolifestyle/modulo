import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { useEffect, useState } from 'react';
import { useRedesCelulasService } from '../../services/useRedesCelulasService';

const dataColumns = [
  'Rede',
  'Célula',
  'Nome',
  'Sexo',
  'Telefone',
  'Data de Nascimento',
  'Idade'
];

export default function TableAlunos({ alunos, loading, columnsExtras, columnsDefault }) {
  const { redes, celulas } = useRedesCelulasService();
  const [visibleColumns, setVisibleColumns] = useState(columnsDefault ? columnsDefault : ["Rede", "Célula", "Nome"]);
  const [countRealRows, setCountRealRows] = useState(0);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    rede: { value: null, matchMode: FilterMatchMode.IN },
    celula: { value: null, matchMode: FilterMatchMode.IN },
    nome: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    sexo: { value: null, matchMode: FilterMatchMode.IN },
    telefone: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    nascimento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    idade: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
  });

  useEffect(() => {
    setCountRealRows(alunos ? alunos.length : 0)
  }, [alunos])

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  return <DataTable
    value={alunos}
    onValueChange={data => setCountRealRows(data?.length || 0)}
    emptyMessage='Nenhum aluno encontrado'
    loading={loading}
    header={<div className="flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type='search' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Pesquisar por..." />
        </span>
      </div>
      <span>Total de registros: {countRealRows} {countRealRows === 1 ? "aluno" : "alunos"}</span>
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
    multiSortMeta={[{ field: 'rede', order: 1 }]}
    sortOrder={1}
    sortMode="multiple"
    removableSort
    dataKey="uuid"
    filters={filters}>
    {visibleColumns.includes('Rede')
      ? <Column
        key="rede"
        field="rede"
        filter
        filterField="rede"
        filterElement={options => <MultiSelect filter value={options.value} options={redes} onChange={(e) => options.filterCallback(e.value)} placeholder="Filtrar por Rede" className="p-column-filter" />}
        showFilterMatchModes={false}
        header="Rede"
        sortable />
      : null}
    {visibleColumns.includes('Célula')
      ? <Column
        key="celula"
        field="celula"
        filter
        filterField="celula"
        filterElement={options => <MultiSelect filter value={options.value} options={celulas} onChange={(e) => options.filterCallback(e.value)} placeholder="Filtrar por Célula" className="p-column-filter" />}
        showFilterMatchModes={false}
        header="Célula"
        sortable />
      : null}
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
    {visibleColumns.includes('Sexo')
      ? <Column
        key="sexo"
        field="sexo"
        filter
        filterField="sexo"
        filterElement={options => <MultiSelect filter value={options.value} options={['Masculino', 'Feminino']} onChange={(e) => options.filterCallback(e.value)} placeholder="Filtrar por Sexo" className="p-column-filter" />}
        showFilterMatchModes={false}
        header="Sexo"
        sortable />
      : null}
    {visibleColumns.includes('Idade')
      ? <Column
        key="idade"
        field="idade"
        filterField="idade"
        filter
        filterPlaceholder="Filtrar por Idade"
        dataType="numeric"
        header="Idade"
        sortable />
      : null}
    {visibleColumns.includes('Dt. Nascimento')
      ? <Column
        key="nascimento"
        field="nascimento"
        filterField="nascimento"
        filter
        filterPlaceholder="Filtrar por Dt. Nascimento"
        header="Dt. Nascimento" />
      : null}
    {visibleColumns.includes('Telefone')
      ? <Column
        key="telefone"
        field="telefone"
        filterField="telefone"
        filter
        filterPlaceholder="Filtrar por Telefone"
        header="Telefone" />
      : null}
    {
      columnsExtras
        ? columnsExtras
        : null
    }
  </DataTable>
}