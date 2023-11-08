import {
  ClassFiscal,
  Clientes,
  ConfTributária,
  Departamento,
  Fornecedores,
  NatOperacao,
  OS,
  Produtos,
  Secao,
  Transportadoras,
} from "./pages";

const pages = {
  ClassFiscal,
  Clientes,
  ConfTributária,
  Departamento,
  Fornecedores,
  NatOperacao,
  OS,
  Produtos,
  Secao,
  Transportadoras,
};

export const navigation = [
  {
    text: "CRM",
    icon: "folder",
    role: "fiscal",
    items: [
      {
        text: "Clientes",
        path: "/clientes",
        element: pages["Clientes"],
      },
      {
        text: "Fornecedores",
        path: "/fornecedores",
        element: pages["Fornecedores"],
      },
      {
        text: "Transportadoras",
        path: "/transportadoras",
        element: pages["Transportadoras"],
      },
    ],
  },
  {
    text: "Fiscal",
    icon: "folder",
    role: "contabilidade",
    items: [
      {
        text: "Natureza Operação",
        path: "/operacao",
        element: pages["NatOperacao"],
      },
      {
        text: "Classe fiscal",
        path: "/fiscal",
        element: pages["ClassFiscal"],
      },
      {
        text: "Conf Tributária",
        path: "/confTributaria",
        element: pages["ConfTributária"],
      },
    ],
  },
  {
    text: "Suprimentos",
    icon: "folder",
    role: "contabilidade",
    items: [
      {
        text: "Produtos",
        path: "/produtos",
        element: pages["Produtos"],
      },
      {
        text: "Departamento",
        path: "/departamento",
        element: pages["Departamento"],
      },
      {
        text: "Seção",
        path: "/secao",
        element: pages["Secao"],
      },
      {
        text: "O.S.",
        path: "/os",
        element: pages["OS"],
      },
    ],
  },
];
