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

    <div class="chart-wrapper">
      <div class="chart-grid"></div>
      <div class="chart-bars">
        <div v-for="(bar, index) in normalizedBars" :key="index" class="bar-item">
          <span class="bar" :class="{ highlight: bar.highlight }" :style="{ height: `${bar.height}%` }"></span>
        </div>
      </div>
    </div>

    <div class="periodo-date-pill">
      De {{ formatPeriodoDate(periodo.inicio) }} à {{ formatPeriodoDate(periodo.fim) }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import filterIcon from '@/assets/icons/filter-tunnel.svg'

const props = defineProps({
  valor: {
    type: Number,
    default: 760102.06
  },
  crescimento: {
    type: Number,
    default: 123.9
  },
  barras: {
    type: Array,
    default: () => [24, 38, 52, 66, 54, 28, 18, 22, 30, 40, 26, 18, 44, 62]
  },
  periodo: {
    type: Object,
    default: () => ({
      inicio: '2024-12-15',
      fim: '2025-02-07'
    })
  }
})

const normalizedBars = computed(() => {
  const maxValue = Math.max(...props.barras, 0.0001)
  return props.barras.map((value) => {
    return {
      height: (value / maxValue) * 100,
      highlight: value >= maxValue * 0.75
    }
  })
})

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

const meses = ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.']

const formatPeriodoDate = (dateString) => {
  const date = new Date(dateString)
  if (isNaN(date)) return dateString
  const dia = String(date.getDate()).padStart(2, '0')
  const mes = meses[date.getMonth()] || ''
  const ano = date.getFullYear()
  return `${dia} de ${mes} de ${ano}`
}
</script>

<style scoped>
.periodo-card {
  background: #ffffff;
  border-radius: 22px;
  padding: 1.5rem;
  box-shadow: 0 6px 20px rgba(8, 15, 40, 0.08);
  border: 1px solid rgba(15, 42, 98, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.periodo-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.periodo-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.35rem 0;
}

.periodo-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: #111827;
  line-height: 1.1;
}

.periodo-growth {
  margin: 0.35rem 0 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #16a34a;
}

.periodo-growth.negative {
  color: #dc2626;
}

.filter-button {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  border: 2px solid #1f6bff;
  background: #f8fbff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.filter-inner {
  width: 46px;
  height: 46px;
  border-radius: 999px;
  border: 1.4px dashed #b5c4ff;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 3px 6px rgba(22, 29, 64, 0.08);
}

.filter-inner img {
  width: 22px;
  height: 22px;
}

.chart-wrapper {
  position: relative;
  background: #f5f7fd;
  border-radius: 18px;
  padding: 0.75rem 1rem 1.25rem;
  overflow: hidden;
}

.chart-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to top, rgba(15, 23, 42, 0.08) 1px, transparent 1px);
  background-size: 100% 38px;
  pointer-events: none;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 150px;
  position: relative;
  z-index: 1;
}

.bar-item {
  flex: 1;
  display: flex;
  justify-content: center;
}

.bar {
  width: 12px;
  border-radius: 999px;
  background: linear-gradient(180deg, #2a6bff 0%, #0641fc 100%);
  display: block;
  transition: height 0.2s ease;
}

.bar.highlight {
  background: linear-gradient(180deg, #00d58c 0%, #0d71ff 100%);
  box-shadow: 0 6px 18px rgba(10, 95, 255, 0.25);
}

.periodo-date-pill {
  align-self: center;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: #edf0f7;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}

@media (min-width: 769px) {
  .periodo-card {
    display: none;
  }
}
</style>

