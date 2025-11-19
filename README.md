# 📊 Super Dashboard

> Central de gestão financeira moderna e responsiva para análise de cobranças, faturamento e pagamentos.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-Private-red?style=flat-square)

## ✨ Destaques

- 🎨 **Design Moderno**: Interface limpa e intuitiva com tema escuro
- 📱 **100% Responsivo**: Experiência otimizada para desktop, tablet e mobile
- ⚡ **Performance**: Build otimizado com Vite para carregamento ultra-rápido
- 🧩 **Componentizado**: Arquitetura modular e reutilizável
- 📊 **Visualizações**: Gráficos interativos com Canvas nativo
- 🎯 **UX Refinada**: Componentes customizados (dropdowns, date pickers, etc.)

## 🚀 Tecnologias

### Core
- **[Vue.js 3](https://vuejs.org/)** - Composition API com `<script setup>`
- **[Vite](https://vitejs.dev/)** - Build tool de próxima geração
- **[Vue Router](https://router.vuejs.org/)** - Roteamento oficial do Vue

### Bibliotecas
- **[Axios](https://axios-http.com/)** - Cliente HTTP com interceptors
- **[@solar-icons/vue](https://www.npmjs.com/package/@solar-icons/vue)** - Biblioteca de ícones moderna
- **Canvas API** - Gráficos customizados de alta performance

## 📋 Pré-requisitos

- **Node.js** 18+ (recomendado 20+)
- **npm** 9+ ou **yarn** 1.22+
- Navegador moderno com suporte a ES2020+

## 🛠️ Instalação e Execução

### 1. Clone o repositório

```bash
git clone <repository-url>
cd super-dashboard
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente (opcional)

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=https://api.exemplo.com.br
VITE_API_TIMEOUT=10000
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O dashboard estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
super-dashboard/
├── src/
│   ├── assets/                 # Recursos estáticos
│   │   ├── icons/             # Ícones SVG customizados
│   │   └── images/            # Imagens e logos
│   ├── components/            # Componentes Vue reutilizáveis
│   │   ├── BarChart.vue       # Gráfico de barras com Canvas
│   │   ├── ConversionModalityCard.vue
│   │   ├── DashboardControls.vue  # Controles de filtro superiores
│   │   ├── DateRangePicker.vue    # Seletor de período
│   │   ├── DownloadButton.vue
│   │   ├── Header.vue         # Cabeçalho com informações de faturamento
│   │   ├── HelpButton.vue     # Botão de ajuda flutuante
│   │   ├── MetricCard.vue     # Card de métrica individual
│   │   ├── NewChargeButton.vue    # Botão de nova cobrança
│   │   ├── PaymentFlagsCard.vue   # Card de bandeiras de pagamento
│   │   ├── PendingTransferCard.vue
│   │   ├── RevenueCard.vue    # Card principal de faturamento
│   │   ├── Select.vue         # Dropdown customizado com Teleport
│   │   ├── Sidebar.vue        # Menu lateral de navegação
│   │   ├── StatisticsCard.vue # Card de estatísticas (desktop)
│   │   ├── StatisticsMobileCard.vue
│   │   └── StatisticsPeriodCard.vue
│   ├── router/                # Configuração de rotas
│   │   └── index.js
│   ├── services/              # Camada de serviços
│   │   ├── api.js            # Configuração base do Axios
│   │   └── dashboardService.js  # Endpoints do dashboard
│   ├── views/                 # Views/Páginas
│   │   └── Dashboard.vue      # Página principal
│   ├── App.vue                # Componente raiz
│   ├── main.js                # Entry point
│   └── style.css              # Estilos globais
├── public/                    # Arquivos públicos
├── .env.example              # Template de variáveis de ambiente
├── index.html                # HTML principal
├── vite.config.js            # Configuração do Vite
└── package.json              # Dependências e scripts
```

## 🎨 Funcionalidades

### 📈 Dashboard Principal
- **Faturamento Total**: Visualização com gráfico de barras interativo
- **Métricas Financeiras**: 
  - Faturamento recebido
  - Faturamento previsto (D+2)
  - Vendas pendentes
  - Ticket médio
  - Número de cobranças

### 📊 Estatísticas Detalhadas
- Reembolsos
- Chargebacks (com badge de alerta)
- Cancelamentos
- Transações não autorizadas

### 🔄 Análises Avançadas
- **Conversão por Modalidade**: Gráficos donut para Crédito, Débito, Boleto e Pix
- **Bandeiras Utilizadas**: Ranking visual de bandeiras de cartão

### 🎛️ Controles e Filtros
- Seletor de período customizado
- Date range picker com calendário nativo
- Filtro por tipo de cobrança
- Exportação de dados (CSV/Excel)

### 🔔 Ações Rápidas
- Nova cobrança com botão destacado
- Autorização de transferências pendentes
- Botão de ajuda flutuante

## 📱 Responsividade

O dashboard adapta-se perfeitamente a diferentes tamanhos de tela:

| Breakpoint | Resolução | Características |
|-----------|-----------|-----------------|
| **Desktop** | > 1440px | Layout completo com sidebar fixa |
| **Laptop** | 900px - 1440px | Layout adaptativo com wrap de controles |
| **Tablet** | 768px - 899px | Sidebar oculta, cards empilhados |
| **Mobile** | < 768px | UI otimizada, header fixo, navegação simplificada |

### Recursos Responsivos
- ✅ Scroll horizontal invisível em mobile
- ✅ Componentes centralizados automaticamente
- ✅ Botões e cards com tamanhos adaptativos
- ✅ Gráficos responsivos mantendo proporções

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento (hot-reload)

# Build
npm run build        # Gera build otimizado para produção
npm run preview      # Preview local do build de produção

# Linting (se configurado)
npm run lint         # Verifica qualidade do código
npm run format       # Formata código automaticamente
```

## 🎨 Componentes Customizados

### Select Dropdown
Componente de dropdown totalmente customizado usando **Vue Teleport** para renderização fora da hierarquia DOM, evitando problemas com `overflow: hidden`.

```vue
<Select
  v-model="selectedValue"
  :options="options"
  :icon-component="IconComponent"
  placeholder="Selecione..."
  width="200px"
  @change="handleChange"
/>
```

### Date Range Picker
Seletor de intervalo de datas com interface nativa do navegador:

```vue
<DateRangePicker
  :inicio="startDate"
  :fim="endDate"
  @change="handleDateChange"
/>
```

## 🔐 Autenticação e Segurança

- **JWT Token**: Armazenamento seguro no `localStorage`
- **Interceptors**: Token adicionado automaticamente em todas as requisições
- **Timeout**: Proteção contra requisições lentas (10s padrão)
- **Error Handling**: Tratamento centralizado de erros HTTP

## 🌐 Configuração da API

### Estrutura de Serviços

```javascript
// src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000
})

// Interceptor de requisição
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
```

### Endpoints Disponíveis

```javascript
// src/services/dashboardService.js
export const dashboardService = {
  getFaturamento: () => api.get('/dashboard/faturamento'),
  getEstatisticas: () => api.get('/dashboard/estatisticas'),
  getConversaoModalidade: () => api.get('/dashboard/conversao'),
  getBandeirasUtilizadas: () => api.get('/dashboard/bandeiras'),
  getTransferenciasPendentes: () => api.get('/dashboard/transferencias'),
  autorizarTransferencia: (id) => api.post(`/transferencias/${id}/autorizar`)
}
```

## 🎯 Padrões de Código

### Nomenclatura
- **Componentes**: PascalCase (ex: `NewChargeButton.vue`)
- **Variáveis**: camelCase (ex: `revenueData`)
- **Classes CSS**: kebab-case (ex: `.revenue-card`)
- **Eventos**: kebab-case (ex: `@period-change`)

### Composição
- Uso consistente de **Composition API** com `<script setup>`
- Props tipadas com validação
- Emits declarados explicitamente
- Refs e computed bem nomeados

### Estilização
- Estilos escopados por padrão (`<style scoped>`)
- Cores diretas (não usar CSS variables em scoped styles)
- Responsividade com media queries
- Flexbox e Grid para layouts

## 🐛 Troubleshooting

### Porta já em uso
```bash
# Especifique outra porta
npm run dev -- --port 3001
```

### Dependências desatualizadas
```bash
npm update
# ou para atualização major
npm install <package>@latest
```

### Build falhando
```bash
# Limpe cache e reinstale
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📈 Performance

- ⚡ **Build Time**: ~2-3s (Vite)
- 📦 **Bundle Size**: ~150KB (gzipped)
- 🚀 **First Contentful Paint**: < 1s
- ♻️ **Code Splitting**: Automático por rota

## 🤝 Contribuindo

1. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
2. Commit suas mudanças: `git commit -m 'feat: adiciona nova feature'`
3. Push para a branch: `git push origin feature/minha-feature`
4. Abra um Pull Request

### Convenção de Commits
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `refactor`: Refatoração de código
- `style`: Alterações de estilo/formatação
- `docs`: Documentação
- `chore`: Tarefas de manutenção

## 📝 Licença

Este projeto é de uso interno e privado.

---

**Desenvolvido com ❤️ usando Vue.js 3 e Vite**
