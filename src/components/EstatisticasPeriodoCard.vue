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

const DEFAULT_BARS = [6, 12, 18, 32, 48, 65, 38, 24, 18, 22, 28, 40, 20, 14, 26, 34, 18, 12, 28, 42, 30]

const normalizedBars = computed(() => {
  const source = Array.isArray(props.barras) && props.barras.length
    ? props.barras
    : DEFAULT_BARS

  const sanitized = source
    .slice(0, 21)
    .map((value) => {
      const numeric = Number(value)
      return Number.isFinite(numeric) && numeric > 0 ? numeric : 0
    })

  const maxValue = Math.max(...sanitized, 1)

  return sanitized.map((value) => {
    const ratio = (value / maxValue) * 100
    return {
      height: Math.max(ratio, 4),
      highlight: value >= maxValue * 0.7
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
  border-radius: 28px;
  padding: 1.75rem 1.5rem 1.5rem;
  border: 1px solid #E4E7F1;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.periodo-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.periodo-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.45rem 0;
}

.periodo-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: #2A2E33;
  line-height: 1.15;
}

.periodo-growth {
  margin: 0.35rem 0 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #34A853;
  display: flex;
  gap: 0.35rem;
  align-items: center;
}

.periodo-growth.negative {
  color: #dc2626;
}

.filter-button {
  width: 62px;
  height: 62px;
  border-radius: 18px;
  border: 2px solid #2A74FF;
  background: #f5f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-shadow: 0 8px 18px rgba(26, 96, 255, 0.18);
}

.filter-inner {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  border: 1px solid #D4DAE8;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 6px rgba(15, 23, 42, 0.08);
}

.filter-inner img {
  width: 22px;
  height: 22px;
}

.chart-wrapper {
  position: relative;
  background: #f5f7fd;
  border-radius: 20px;
  padding: 1rem 1.5rem 1.75rem;
  overflow: hidden;
  border: 1px solid #e5e8f3;
}

.chart-grid {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    to top,
    rgba(99, 110, 140, 0.16),
    rgba(99, 110, 140, 0.16) 1px,
    transparent 1px,
    transparent 34px
  );
  pointer-events: none;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 13px;
  height: 140px;
  position: relative;
  z-index: 1;
}

.bar-item {
  flex: 1;
  display: flex;
  justify-content: center;
}

.bar {
  width: 10px;
  border-radius: 999px;
  background: linear-gradient(180deg, #3C7BFF 0%, #0A4FFC 100%);
  display: block;
  transition: height 0.25s ease;
}

.bar.highlight {
  background: linear-gradient(180deg, #00D78C 0%, #0B6DFF 100%);
  box-shadow: 0 8px 20px rgba(15, 111, 255, 0.3);
}

.periodo-date-pill {
  align-self: center;
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  background: #e6ebf7;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #536079;
}
</style>

