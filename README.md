# LumiDash
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  [![React](https://img.shields.io/badge/React-19+-61DAFB?logo=react)](https://react.dev/)  [![Vite](https://img.shields.io/badge/Vite-4+-646CFF?logo=vite)](https://vitejs.dev/)  [![TypeScript](https://img.shields.io/badge/TypeScript-4+-blue?logo=typescript)](https://www.typescriptlang.org/)  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

**LumiDash** é a interface frontend do ecossistema *Lumi*, projetada para oferecer visualizações interativas de dados e facilitar a comunicação com modelos de linguagem de última geração (LLMs), como a Billumy. Com uma interface moderna e responsiva, o LumiDash transforma dados em insights acionáveis para usuários técnicos e não técnicos.

## Principais Funcionalidades

* **Dashboards Interativos**: Visualizações dinâmicas e personalizáveis usando gráficos, tabelas e métricas.
* **Integração com LLMs**: Comunicação com o backend (LumiCore) para interpretar dados com apoio de modelos de linguagem.
* **Filtros Inteligentes**: Explore os dados com filtros intuitivos e responsivos.
* **Experiência de Usuário Moderna**: Interface desenvolvida com foco em usabilidade e performance.

## Tecnologias Utilizadas

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [D3.js](https://d3js.org/)
* [Integração com API REST do LumiCore (Django)](https://github.com/devdinho/LumiCore)

## Instalação

```bash
# Clone o repositório
git clone https://github.com/devdinho/LumiDash.git
cd LumiDash

# Rode o projeto em ambiente de desenvolvimento
docker compose up --build
```

## Configuração

Crie um arquivo `.env.local` com as seguintes variáveis:

```env
VITE_API_URL=http://localhost:8003/api
```

## Estrutura do Projeto

```
lumidash/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/       # Comunicação com o backend
│   ├── utils/
│   └── main.tsx
└── public/
```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).