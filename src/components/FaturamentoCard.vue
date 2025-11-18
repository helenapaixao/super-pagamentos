<template>
  <div class="faturamento-card">
    <div class="faturamento-desktop-view">
      <div class="card-header">
        <h2 class="card-title">Faturamento</h2>
        <div class="title-icon">
          <img :src="eyeDashboardIcon" alt="Visibilidade" class="eye-svg" />
        </div>
      </div>

      <div class="value-row">
        <span class="currency-label">R$</span>
        <span class="faturamento-value">{{ formatCurrency(faturamento.total) }}</span>
        <div class="growth-group">
          <span class="growth-indicator positive">↑ {{ faturamento.crescimento }}%</span>
          <span class="growth-text">Em crescimento</span>
        </div>
      </div>

      <BarChart :data="faturamento.dadosGrafico" :max-value="200000" :height="172" class="faturamento-chart" />

      <div class="faturamento-metrics">
        <MetricCard
          label="Faturamento recebido"
          :value="`R$ ${formatCurrency(faturamento.recebido)}`"
          dot-type="blue"
        />
        <MetricCard
          label="Faturamento previsto"
          :value="`R$ ${formatCurrency(faturamento.previsto)}`"
          dot-type="purple"
          tag="D+2"
        />
        <MetricCard
          label="Vendas pendentes"
          :value="`R$ ${formatCurrency(faturamento.pendentes)}`"
          dot-type="orange"
        />
        <MetricCard
          label="Ticket médio"
          :value="`R$ ${formatCurrency(faturamento.ticketMedio)}`"
          dot-type="purple"
        />
        <MetricCard
          label="Número de cobranças"
          :value="formatNumber(faturamento.numeroCobrancas)"
          dot-type="black"
        />
      </div>
    </div>

    <EstatisticasPeriodoCard
      class="faturamento-mobile-view"
      :valor="faturamento.total"
      :crescimento="faturamento.crescimento"
      :barras="mobileBarras"
      :periodo="mobilePeriodo"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import eyeDashboardIcon from '@/assets/icons/eye-dashboard.svg'
import MetricCard from './MetricCard.vue'
import BarChart from './BarChart.vue'
import EstatisticasPeriodoCard from './EstatisticasPeriodoCard.vue'

const props = defineProps({
  faturamento: {
    type: Object,
    required: true,
    default: () => ({
      total: 1060551.14,
      crescimento: 123.9,
      recebido: 245340.90,
      previsto: 815210.24,
      pendentes: 15332.18,
      ticketMedio: 192.30,
      numeroCobrancas: 12349,
      dadosGrafico: []
    })
  }
})

const mobileBarras = computed(() => {
  const dados = Array.isArray(props.faturamento?.dadosGrafico)
    ? props.faturamento.dadosGrafico
    : []
  if (!dados.length) {
    return [24, 38, 52, 66, 54, 28, 18, 22, 30, 40, 26, 18, 44, 62]
  }
  return dados.slice(0, 14)
})

const mobilePeriodo = computed(() => {
  if (props.faturamento?.periodo) {
    return props.faturamento.periodo
  }
  return {
    inicio: '2024-12-15',
    fim: '2025-02-07'
  }
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const formatNumber = (value) => {
  return new Intl.NumberFormat('pt-BR').format(value)
}
</script>

<style scoped>
.faturamento-card {
  background: white;
  width: 100%;
  border-radius: 20px;
  padding: 2rem 2.5rem;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
  margin-bottom: 2rem;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.card-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0%;
  color: #2A2E33;
  margin: 0;
}

.title-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: transparent;
  border: none;
}

.eye-icon {
  color: #86898B;
}

.eye-svg {
  width: 24px;
  height: 24px;
  display: block;
}

.value-row {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.currency-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #86898B;
}

.faturamento-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #0641FC;
  line-height: 1;
}

.growth-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1.5rem;
}

.growth-indicator {
  font-weight: 600;
  font-size: 0.9rem;
}

.growth-indicator.positive {
   font-family: 'Plus Jakarta Sans', sans-serif;
  color: #10b981;
  font-weight: 600;
}

.growth-text {
  color: #86898B;
  font-size: 0.9rem;
}

.faturamento-chart {
  margin-top: 51px;
}

.faturamento-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 33px;
}

.faturamento-mobile-view {
  display: none;
}

@media (max-width: 768px) {
  .faturamento-card {
    padding: 0;
    background: transparent;
    box-shadow: none;
  }

  .faturamento-desktop-view {
    display: none;
  }

  .faturamento-mobile-view {
    display: block;
  }
}
</style>

