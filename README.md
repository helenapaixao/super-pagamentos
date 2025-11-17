# Super Dashboard - Central de Gestão

Dashboard financeiro desenvolvido com Vue.js 3 para gestão de cobranças, faturamento e análises de pagamento.

## 🚀 Tecnologias

- **Vue.js 3** - Framework JavaScript progressivo
- **Axios** - Cliente HTTP para requisições à API
- **Vue Router** - Roteamento para aplicações Vue.js
- **Vite** - Build tool e dev server

## 📋 Requisitos

- Node.js 16+ 
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório ou navegue até o diretório do projeto:
```bash
cd super-dashboard
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse o dashboard em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
super-dashboard/
├── src/
│   ├── components/          # Componentes Vue reutilizáveis
│   │   ├── Header.vue       # Cabeçalho do dashboard
│   │   ├── Sidebar.vue       # Menu lateral
│   │   ├── DashboardControls.vue  # Controles de filtro
│   │   ├── FaturamentoCard.vue    # Card de faturamento com gráfico
│   │   ├── TransferenciaPendenteCard.vue  # Card de transferências
│   │   ├── EstatisticasCard.vue   # Cards de estatísticas
│   │   ├── ConversaoModalidadeCard.vue  # Gráficos de conversão
│   │   └── BandeirasCard.vue      # Gráfico de bandeiras
│   ├── views/               # Views/páginas
│   │   └── Dashboard.vue    # Página principal do dashboard
│   ├── services/            # Serviços de API
│   │   ├── api.js          # Configuração do Axios
│   │   └── dashboardService.js  # Serviços do dashboard
│   ├── router/             # Configuração de rotas
│   │   └── index.js
│   ├── App.vue             # Componente raiz
│   ├── main.js             # Entry point
│   └── style.css           # Estilos globais
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Características

- ✅ Design responsivo para desktop, tablet e mobile
- ✅ Componentização modular e reutilizável
- ✅ Integração com API via Axios
- ✅ Gráficos interativos (Canvas)
- ✅ Layout fiel ao design fornecido
- ✅ Tema escuro no header
- ✅ Cards de estatísticas dinâmicos

## 🔧 Configuração da API

Para conectar com a API real, configure a variável de ambiente:

1. Crie um arquivo `.env` na raiz do projeto:
```env
VITE_API_BASE_URL=https://sua-api.com.br
```

2. O serviço de API está configurado em `src/services/api.js` e já inclui:
   - Interceptor para adicionar token de autenticação
   - Tratamento de erros
   - Timeout de requisições

## 📱 Responsividade

O dashboard é totalmente responsivo com breakpoints para:
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🎯 Funcionalidades

- Visualização de faturamento com gráfico de barras
- Estatísticas de reembolsos, chargebacks, cancelados e não autorizados
- Conversão por modalidade de pagamento (gráficos donut)
- Bandeiras mais utilizadas (gráfico de barras)
- Transferências pendentes com aprovação
- Filtros por período e tipo de cobrança
- Exportação de dados (botão download)

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção

## 🔐 Autenticação

O sistema utiliza tokens JWT armazenados no `localStorage`. O token é automaticamente adicionado às requisições via interceptor do Axios.

## 📄 Licença

Este projeto foi desenvolvido para uso interno.

