import { Page } from '../../components/page';
import { useAlunosService } from '../../services/useAlunosService';
import { useConfigService } from '../../services/useConfigService';
import TableAlunos from '../../components/tables/alunos';

export default function Alunos() {
  const { alunos } = useAlunosService()
  const { permitirMatricula } = useConfigService()

  return <Page
    title="Alunos"
    actions={permitirMatricula === true
      ? <a
        href='/alunos/cadastro'
        className="bg-white text-black px-3 py-2">
        Matricular alunos
      </a>
      : null}>
    <TableAlunos alunos={alunos} loading={alunos === undefined} />
  </Page>;
}