# Empreendimentos SC

Aplicação web para **cadastro e gestão de empreendimentos em Santa Catarina**. Permite listar, criar, visualizar, editar e excluir registros de empresas com validação de formulários e interface responsiva.

**Acesso em produção:** [https://empreendimentos-sc.vercel.app/](https://empreendimentos-sc.vercel.app/)

**Vídeo pitch da aplicação:** [https://youtu.be/NfWfuZPbUJc](https://youtu.be/NfWfuZPbUJc)

---

## Descrição

O projeto é um CRUD de empreendimentos com os seguintes campos por registro:

- **Nome** da empresa
- **Responsável** (gerente)
- **Cidade** (município em SC)
- **Segmento** (Tecnologia, Comércio, Indústria, Serviços, Agronegócio)
- **Contato** (e-mail ou outro)
- **Status** (Ativo / Inativo)

Os dados são persistidos em um arquivo JSON (`data/businesses.json`), sem banco de dados externo.

---

## Pré-requisitos

- **Node.js** 18+ (recomendado 20+)
- **npm** ou **yarn** / **pnpm**

---

## Como rodar o projeto

### 1. Clonar e instalar dependências

```bash
git clone <url-do-repositorio>
cd my-app
npm install
```

### 2. Desenvolvimento

```bash
npm run dev
```

A aplicação sobe em [http://localhost:3000](http://localhost:3000).

### 3. Build e produção (local)

```bash
npm run build
npm start
```

O build gera a pasta `.next` e o servidor escuta na porta 3000.

### 4. Lint

```bash
npm run lint
```

---

## Estrutura de pastas

```
my-app/
├── data/
│   └── businesses.json          # Persistência dos empreendimentos (JSON)
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/
│   │   │   └── businesses/
│   │   │       ├── route.ts      # GET (listar) e POST (criar)
│   │   │   └── [id]/
│   │   │       └── route.ts     # GET, PUT, DELETE por ID
│   │   ├── business/[id]/
│   │   │   └── page.tsx         # Página de detalhe do empreendimento
│   │   ├── edit/[id]/
│   │   │   └── page.tsx         # Página de edição
│   │   ├── new/
│   │   │   └── page.tsx         # Página de novo empreendimento
│   │   ├── globals.css
│   │   ├── layout.tsx           # Layout raiz (metadata, fontes)
│   │   └── page.tsx             # Página inicial (lista)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BusinessCard.tsx
│   │   │   ├── BusinessList.tsx
│   │   │   └── PageHeader.tsx
│   │   ├── forms/
│   │   │   └── BusinessForm.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── ConfirmModal.tsx
│   ├── constants/
│   │   └── business.ts
│   ├── libs/
│   │   ├── business-storage.ts  # Leitura/escrita do JSON
│   │   └── schema.ts            # Validação Zod do formulário
│   ├── mocks/
│   │   └── business.ts
│   ├── services/
│   │   └── business.ts          # Chamadas à API de negócios
│   └── types/
│       └── business.ts          # Tipos e enums (Business, setor, status)
├── package.json
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

Resumo por pasta:

| Pasta / arquivo  | Função                                                    |
| ---------------- | --------------------------------------------------------- |
| `src/app`        | Rotas e páginas (App Router) e API Routes                 |
| `src/components` | Componentes reutilizáveis (layout, formulário, UI)        |
| `src/libs`       | Lógica de armazenamento (JSON) e schema de validação      |
| `src/services`   | Cliente da API (fetch dos endpoints)                      |
| `src/types`      | Tipos TypeScript e enums do domínio                       |
| `data/`          | Dados persistidos (criado automaticamente se não existir) |

---

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Zod** + **react-hook-form** + **@hookform/resolvers** (formulários e validação)

---

## API

Base URL (local): `http://localhost:3000/api/businesses`

| Método | Rota                   | Descrição                                                    |
| ------ | ---------------------- | ------------------------------------------------------------ |
| GET    | `/api/businesses`      | Lista todos os empreendimentos                               |
| POST   | `/api/businesses`      | Cria um novo empreendimento (body JSON validado pelo schema) |
| GET    | `/api/businesses/[id]` | Retorna um empreendimento por ID                             |
| PUT    | `/api/businesses/[id]` | Atualiza um empreendimento                                   |
| DELETE | `/api/businesses/[id]` | Remove um empreendimento                                     |

O corpo das requisições POST/PUT deve seguir o schema definido em `src/libs/schema.ts` (nome, manager, city, sector, contact, status).
