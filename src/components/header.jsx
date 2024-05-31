import { Menubar } from 'primereact/menubar';

export const HeaderNavigation = () => {
  let navigation = [
    {
      icon: "pi pi-home",
      label: "Inicio",
      url: "/",
    },
    {
      icon: "pi pi-th-large",
      label: "Gerenciar",
      items: [
        {
          icon: "pi pi-users",
          label: "Alunos",
          url: "/alunos"
        },
        {
          icon: "pi pi-tags",
          label: "Turmas",
          url: "/turmas"
        }
      ]
    },
    {
      icon: "pi pi-file-edit",
      label: "Frequencias",
      url: "/frequencias",
    },
    {
      icon: "pi pi-check-square",
      label: "Atividades/Provas",
      url: "/atividades",
    },
  ]
  return <Menubar
    className="px-6 xl:px-32 py-4 flex justify-between shadow-xl"
    style={{ borderRadius: 0}}
    model={navigation}
    start={<img
      className="h-12"
      src="/logo.png"
      alt="Logo Refúgio"
    />} />
}