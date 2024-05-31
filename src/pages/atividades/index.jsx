import { Page } from '../../components/page';
import TableAtividades from '../../components/tables/atividades';
import { useAtividadesService } from '../../services/useAtividadesService';

export default function Atividades() {
  const { atividades } = useAtividadesService();

  return <Page title="Atividades"
    actions={<a
      href='/atividades/cadastro'
      className="bg-white text-black px-3 py-2">
      <i className="pi pi-check mr-2"></i>
      Lançar atividade
    </a>}>
    <TableAtividades frequencias={atividades} loading={atividades === undefined} />
  </Page>;
}