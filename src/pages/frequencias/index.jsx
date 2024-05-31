import { Page } from '../../components/page';
import TableFrequencias from '../../components/tables/frequencias';
import { useFrequenciasService } from '../../services/useFrequenciasService';

export default function Frequencias() {
  const { frequencias } = useFrequenciasService();

  return <Page title="Frequências"
    actions={<a
      href='/frequencias/cadastro'
      className="bg-white text-black px-3 py-2">
      <i className="pi pi-pencil mr-2"></i>
      Lançar frequência
    </a>}>
    <TableFrequencias frequencias={frequencias} loading={frequencias === undefined} />
  </Page>;
}