<template>
  <div class="revenue-card">
    <div class="revenue-desktop-view">
      <div class="card-header">
        <h2 class="card-title">Faturamento</h2>
        <div class="title-icon">
          <Eye :size="24" class="eye-icon" />
        </div>
      </div>

      <div class="value-row">
        <span class="currency-label">R$</span>
        <span class="revenue-value">{{ formatCurrency(faturamento.total) }}</span>
        <div class="growth-group">
          <span class="growth-indicator positive">↑ {{ faturamento.crescimento }}%</span>
          <span class="growth-text">Em crescimento</span>
        </div>
      </div>

      <BarChart :data="faturamento.dadosGrafico" :max-value="200000" :height="172" class="revenue-chart" />

      <div class="revenue-metrics">
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

    <div class="revenue-mobile-view">
      <StatisticsPeriodCard
        :valor="faturamento.total"
        :crescimento="faturamento.crescimento"
        :dados-grafico="faturamento.dadosGrafico"
        :periodo="mobilePeriodo"
        @periodo-change="handlePeriodChange"
      />
      
      <div class="revenue-metrics-mobile">
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
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Eye } from '@solar-icons/vue'
import MetricCard from './MetricCard.vue'
import BarChart from './BarChart.vue'
import StatisticsPeriodCard from './StatisticsPeriodCard.vue'

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

const mobilePeriodo = computed(() => {
  if (props.faturamento?.periodo) {
    return props.faturamento.periodo
  }
  return {
    inicio: '2024-12-14',
    fim: '2025-02-06'
  }
})

const emit = defineEmits(['periodo-change'])

const handlePeriodChange = (novoPeriodo) => {
  emit('periodo-change', novoPeriodo)
}

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
.revenue-card {
  background: white;
  width: 100%;
  border-radius: 20px;
  padding: 2rem 2.5rem;
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
  width: 24px;
  height: 24px;
  color: #86898B;
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

.revenue-value {
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

.revenue-chart {
  margin-top: 51px;
}

.revenue-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 33px;
}

.revenue-mobile-view {
  display: none;
}

@media (max-width: 768px) {
  .revenue-card {
    padding: 0;
    background: transparent;
    box-shadow: none;
  }

  .revenue-desktop-view {
    display: none;
  }

  .revenue-mobile-view {
    display: block;
  }

  .revenue-metrics {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-top: 1.5rem;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
    scrollbar-color: #D1D5DB transparent;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.5rem;
  }

  .revenue-metrics::-webkit-scrollbar {
    height: 4px;
  }

  .revenue-metrics::-webkit-scrollbar-track {
    background: transparent;
  }

  .revenue-metrics::-webkit-scrollbar-thumb {
    background-color: #D1D5DB;
    border-radius: 2px;
  }

  .revenue-metrics :deep(.metric-item-base) {
    flex-shrink: 0;
    min-width: 220px;
    width: 220px;
  }

  .revenue-metrics-mobile {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 20px;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
    scrollbar-color: #D1D5DB transparent;
    -webkit-overflow-scrolling: touch;
    padding: 10px 0;
  }

  .revenue-metrics-mobile::-webkit-scrollbar {
    height: 4px;
  }

  .revenue-metrics-mobile::-webkit-scrollbar-track {
    background: transparent;
  }

  .revenue-metrics-mobile::-webkit-scrollbar-thumb {
    background-color: #D1D5DB;
    border-radius: 2px;
  }

  .revenue-metrics-mobile :deep(.metric-item-base) {
    flex-shrink: 0;
    min-width: 220px;
    width: 220px;
    padding: 10px;
  }
}
</style>

