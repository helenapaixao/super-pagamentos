<template>
  <div class="dashboard-layout">
    <Header />
    <div class="dashboard-content">
      <Sidebar />
      <main class="dashboard-main">
        <DashboardControls
          @nova-cobranca="handleNovaCobranca"
          @periodo-change="handlePeriodoChange"
          @data-change="handleDataChange"
          @tipo-change="handleTipoChange"
        />

        <FaturamentoCard :faturamento="faturamentoData" />

        <TransferenciaPendenteCard
          v-if="transferenciaPendente"
          :transferencia="transferenciaPendente"
          @autorizar="handleAutorizarTransferencia"
        />

        <div class="estatisticas-grid">
          <EstatisticasCard
            titulo="Reembolsos"
            :valor="estatisticas.reembolsos.valor"
            :cobrancas="estatisticas.reembolsos.cobrancas"
            :percentual="estatisticas.reembolsos.percentual"
          />
          <EstatisticasCard
            titulo="Chargebacks"
            :valor="estatisticas.chargebacks.valor"
            :cobrancas="estatisticas.chargebacks.cobrancas"
            :percentual="estatisticas.chargebacks.percentual"
            :show-badge="true"
          />
          <EstatisticasCard
            titulo="Cancelados"
            :valor="estatisticas.cancelados.valor"
            :cobrancas="estatisticas.cancelados.cobrancas"
            :percentual="estatisticas.cancelados.percentual"
          />
          <EstatisticasCard
            titulo="Não autorizado"
            :valor="estatisticas.naoAutorizado.valor"
            :cobrancas="estatisticas.naoAutorizado.cobrancas"
            :percentual="estatisticas.naoAutorizado.percentual"
          />
        </div>

        <div class="charts-grid">
          <ConversaoModalidadeCard :modalidades="conversaoModalidades" />
          <BandeirasCard :bandeiras="bandeirasUtilizadas" />
        </div>

        <HelpButton :fixed="true" @click="handleHelpClick" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import DashboardControls from '../components/DashboardControls.vue'
import FaturamentoCard from '../components/FaturamentoCard.vue'
import TransferenciaPendenteCard from '../components/TransferenciaPendenteCard.vue'
import EstatisticasCard from '../components/EstatisticasCard.vue'
import ConversaoModalidadeCard from '../components/ConversaoModalidadeCard.vue'
import BandeirasCard from '../components/BandeirasCard.vue'
import HelpButton from '../components/HelpButton.vue'
import { dashboardService } from '../services/dashboardService'

const faturamentoData = ref({
  total: 1060551.14,
  crescimento: 123.9,
  recebido: 245340.90,
  previsto: 815210.24,
  pendentes: 15332.18,
  ticketMedio: 192.30,
  numeroCobrancas: 12349,
  dadosGrafico: Array.from({ length: 31 }, () => Math.random() * 200000)
})

const transferenciaPendente = ref({
  id: 1,
  valor: 29119.15
})

const estatisticas = ref({
  reembolsos: {
    valor: 8260.10,
    cobrancas: 233,
    percentual: 4.5
  },
  chargebacks: {
    valor: 1260.10,
    cobrancas: 5,
    percentual: 0.3
  },
  cancelados: {
    valor: 3120.60,
    cobrancas: 32,
    percentual: 1.5
  },
  naoAutorizado: {
    valor: 6120.60,
    cobrancas: 122,
    percentual: 3.1
  }
})

const conversaoModalidades = ref([
  { nome: 'Crédito', percentual: 92, cor: 'blue' },
  { nome: 'Débito', percentual: 95, cor: 'purple' },
  { nome: 'Boleto', percentual: 42, cor: 'orange' },
  { nome: 'Pix', percentual: 98, cor: 'blue' }
])

const bandeirasUtilizadas = ref([
  { nome: 'VISA', percentual: 70 },
  { nome: 'Mastercard', percentual: 65 },
  { nome: 'ELO', percentual: 55 },
  { nome: 'Hipercard', percentual: 25 },
  { nome: 'AM EX', percentual: 15 },
  { nome: 'G Pay', percentual: 15 },
  { nome: 'Samsung Pay', percentual: 65 },
  { nome: 'Apple Pay', percentual: 70 },
  { nome: 'Hiper', percentual: 8 }
])

const handleNovaCobranca = () => {
  console.log('Nova cobrança')
}

const handlePeriodoChange = (periodo) => {
  console.log('Período alterado:', periodo)
  loadDashboardData()
}

const handleDataChange = ({ inicio, fim }) => {
  console.log('Datas alteradas:', inicio, fim)
  loadDashboardData()
}

const handleTipoChange = (tipo) => {
  console.log('Tipo alterado:', tipo)
  loadDashboardData()
}

const handleAutorizarTransferencia = async (transferenciaId) => {
  try {
    await dashboardService.autorizarTransferencia(transferenciaId)
    transferenciaPendente.value = null
    alert('Transferência autorizada com sucesso!')
  } catch (error) {
    console.error('Erro ao autorizar transferência:', error)
    alert('Erro ao autorizar transferência')
  }
}

const handleHelpClick = () => {
  // Lógica para abrir ajuda ou modal de ajuda
  console.log('Ajuda clicada')
}

const loadDashboardData = async () => {
  try {
    // Carregar dados do dashboard
    // const faturamento = await dashboardService.getFaturamento()
    // const estatisticasData = await dashboardService.getEstatisticas()
    // const conversao = await dashboardService.getConversaoModalidade()
    // const bandeiras = await dashboardService.getBandeirasUtilizadas()
    // const transferencias = await dashboardService.getTransferenciasPendentes()

    // faturamentoData.value = faturamento
    // estatisticas.value = estatisticasData
    // conversaoModalidades.value = conversao
    // bandeirasUtilizadas.value = bandeiras
    // transferenciaPendente.value = transferencias[0] || null
  } catch (error) {
    console.error('Erro ao carregar dados do dashboard:', error)
  }
}

onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard-content {
  display: flex;
  flex: 1;
  margin-top: 60px;
}

.dashboard-main {
  flex: 1;
  padding: 2rem;
  background-color: #f5f5f5;
  overflow-y: auto;
  min-height: calc(100vh - 60px);
  margin-left: 280px;
}

.estatisticas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(305px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-main {
    padding: 1rem;
  }

  .estatisticas-grid {
    grid-template-columns: 1fr;
  }
}
</style>

