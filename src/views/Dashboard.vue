<template>
  <div class="dashboard-layout">
    <Header :faturamento="faturamentoData" />
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

        <div class="estatisticas-mobile-wrapper">
          <EstatisticasMobileCard :items="estatisticasMobileItems" />
        </div>

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
import { ref, onMounted, computed } from 'vue'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import DashboardControls from '../components/DashboardControls.vue'
import FaturamentoCard from '../components/FaturamentoCard.vue'
import TransferenciaPendenteCard from '../components/TransferenciaPendenteCard.vue'
import EstatisticasCard from '../components/EstatisticasCard.vue'
import EstatisticasMobileCard from '../components/EstatisticasMobileCard.vue'
import ConversaoModalidadeCard from '../components/ConversaoModalidadeCard.vue'
import BandeirasCard from '../components/BandeirasCard.vue'
import HelpButton from '../components/HelpButton.vue'
import { dashboardService } from '../services/dashboardService'

const periodoSelecionado = ref({
  inicio: '2024-12-14',
  fim: '2025-02-06'
})

const faturamentoData = ref({
  total: 1060551.14,
  crescimento: 123.9,
  recebido: 245340.90,
  previsto: 815210.24,
  pendentes: 15332.18,
  ticketMedio: 192.30,
  numeroCobrancas: 12349,
  dadosGrafico: Array.from({ length: 31 }, () => Math.random() * 200000),
  periodo: periodoSelecionado
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
  periodoSelecionado.value = { inicio, fim }
  faturamentoData.value.periodo = periodoSelecionado.value
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
  console.log('Ajuda clicada')
}

const estatisticasMobileItems = computed(() => [
  {
    titulo: 'Reembolsos',
    valor: estatisticas.value.reembolsos.valor,
    percentual: estatisticas.value.reembolsos.percentual,
    percentualColor: '#F89A1D',
    sparkline: [8, 10, 11, 14, 16, 18, 16]
  },
  {
    titulo: 'Chargebacks',
    valor: estatisticas.value.chargebacks.valor,
    percentual: estatisticas.value.chargebacks.percentual,
    percentualColor: '#FF4D6D',
    sparkline: [16, 15, 14, 13, 14, 15, 16]
  },
  {
    titulo: 'Cancelados',
    valor: estatisticas.value.cancelados.valor,
    percentual: estatisticas.value.cancelados.percentual,
    percentualColor: '#8B8F99',
    sparkline: [10, 11, 12, 12, 11, 12, 12]
  },
  {
    titulo: 'Não autorizado',
    valor: estatisticas.value.naoAutorizado.valor,
    percentual: estatisticas.value.naoAutorizado.percentual,
    percentualColor: '#FF4D6D',
    sparkline: [9, 10, 11, 12, 13, 14, 12]
  }
])

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
  padding: 52px 2rem 2rem 2rem;
  background-color: #f5f5f5;
  overflow-y: auto;
  min-height: calc(100vh - 60px);
  margin-left: 315px;
}

.estatisticas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(305px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.estatisticas-mobile-wrapper {
  display: none;
  margin-bottom: 1.75rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 1024px) {
  .dashboard-main {
    margin-left: 0;
    padding: 2rem 1.25rem 1.5rem;
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    margin-top: 0;
  }

  .dashboard-main {
    padding: 1rem 1rem 1.5rem;
    margin-top: 0;
    margin-left: 0;
    padding-top: 320px;
    overflow-x: hidden;
  }

  .dashboard-content :deep(.sidebar) {
    display: none;
  }

  .estatisticas-grid {
    display: none;
  }

  .estatisticas-mobile-wrapper {
    display: block;
    max-width: 392px;
    width: 100%;
    margin: 0 auto 1.75rem;
  }

  .charts-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
}

</style>

