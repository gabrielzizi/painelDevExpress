import {
  ClassFiscal,
  Clientes,
  ConfTributária,
  Departamento,
  Fornecedores,
  NatOperacao,
  OS, Produtos,
  Secao,
  Transportadoras
} from './pages';

export const navigation = [
  {
    text: 'CRM',
    icon: 'folder',
    items: [
      {
        text: 'Clientes',
        path: '/clientes',
        element: Clientes

      },
      {
        text: 'Fornecedores',
        path: '/fornecedores',
        element: Fornecedores

      },
      {
        text: 'Transportadoras',
        path: '/transportadoras',
        element: Transportadoras

      }
    ]
  },
  {
    text: 'Fiscal',
    icon: 'folder',
    items: [
      {
        text: 'Natureza Operação',
        path: '/operacao',
        element: NatOperacao

      },
      {
        text: 'Classe fiscal',
        path: '/fiscal',
        element: ClassFiscal

      },
      {
        text: 'Conf Tributária',
        path: '/confTributaria',
        element: ConfTributária

      }
    ]
  },
  {
    text: 'Suprimentos',
    icon: 'folder',
    items: [
      {
        text: 'Produtos',
        path: '/produtos',
        element: Produtos

      },
      {
        text: 'Departamento',
        path: '/departamento',
        element: Departamento

      },
      {
        text: 'Seção',
        path: '/secao',
        element: Secao
      },
      {
        text: 'O.S.',
        path: '/os',
        element: OS
      }
    ]
  }
];
