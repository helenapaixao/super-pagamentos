<template>
  <div class="periodo-card">
    <div class="periodo-header">
      <div class="periodo-info">
        <p class="periodo-title">Estatísticas do período</p>
        <p class="periodo-value">R$ {{ formatCurrency(valor) }}</p>
        <p class="periodo-growth" :class="{ positive: crescimento >= 0, negative: crescimento < 0 }">
          <span>{{ crescimento >= 0 ? '↑' : '↓' }} {{ formatPercentual(Math.abs(crescimento)) }}%</span>
        </p>
      </div>
      <button class="filter-button" type="button">
        <span class="filter-inner">
          <img :src="filterIcon" alt="Filtrar" />
        </span>
      </button>
    </div>

    <BarChart
      :data="dadosGrafico"
      :max-value="200000"
      :height="172"
      :show-labels="false"
      class="periodo-chart"
    />

    <div class="periodo-date-pill">
      De {{ formatPeriodoDate(periodo.inicio) }} à {{ formatPeriodoDate(periodo.fim) }}
    </div>
  </div>
</template>

<script setup>
import filterIcon from '@/assets/icons/filter-tunnel.svg'
import BarChart from './BarChart.vue'

const props = defineProps({
  valor: {
    type: Number,
    default: 760102.06
  },
  crescimento: {
    type: Number,
    default: 123.9
  },
  dadosGrafico: {
    type: Array,
    default: () => []
  },
  periodo: {
    type: Object,
    default: () => ({
      inicio: '2024-12-15',
      fim: '2025-02-07'
    })
  }
})

const meses = ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.']

const formatPeriodoDate = (dateString) => {
  const date = new Date(dateString)
  if (isNaN(date)) return dateString
  const dia = String(date.getDate()).padStart(2, '0')
  const mes = meses[date.getMonth()] || ''
  const ano = date.getFullYear()
  return `${dia} de ${mes} de ${ano}`
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const formatPercentual = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value)
}
</script>

<style scoped>
.periodo-card {
  background: #ffffff;
  border-radius: 28px;
  padding: 1.75rem 1.75rem 1.35rem;
  border: 1px solid #E6EBF5;
  box-shadow: 0 18px 35px rgba(12, 24, 52, 0.12);
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
}

.periodo-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.periodo-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.45rem 0;
}

.periodo-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 34px;
  font-weight: 700;
  margin: 0;
  color: #0F172A;
  line-height: 1.1;
}

.periodo-growth {
  margin: 0.35rem 0 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #16a34a;
  display: flex;
  gap: 0.35rem;
  align-items: center;
}

.periodo-growth.negative {
  color: #dc2626;
}

.filter-button {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 2px solid #E5E9F3;
  background: #FDFEFF;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.filter-inner {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid #D7DBE6;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-inner img {
  width: 20px;
  height: 20px;
}

.periodo-chart {
  width: 100%;
}

.periodo-date-pill {
  align-self: center;
  padding: 0.55rem 1.35rem;
  border-radius: 999px;
  background: #EEF1F6;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #6B7280;
}
</style>

