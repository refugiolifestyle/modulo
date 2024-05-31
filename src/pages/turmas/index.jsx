import { Page } from '../../components/page';
import { useConfigService } from '../../services/useConfigService';
import { useTurmasService } from '../../services/useTurmasService';
import TableTurmas from '../../components/tables/turmas';

export default function Turmas() {
  const { turmas } = useTurmasService()
  const { permitirCadastroTurmas } = useConfigService()

  return <Page
    title="Turmas"
    actions={permitirCadastroTurmas === true
      ? <a
        href='/turmas/cadastro'
        className="bg-white text-black px-3 py-2">
        Cadastrar turmas
      </a>
      : null}>
    <TableTurmas turmas={turmas} loading={turmas === undefined} />
  </Page>;
}