<template>
  <div class="estatisticas-mobile-card">
    <div
      v-for="(item, index) in items"
      :key="item.titulo"
      class="estatistica-row"
      :class="{ 'estatistica-row-border': index !== items.length - 1 && index !== items.length - 2 }"
    >
      <div class="estatistica-info">
        <p class="estatistica-title">{{ item.titulo }}</p>
        <p class="estatistica-value">R$ {{ formatCurrency(item.valor) }}</p>
        <p class="estatistica-percent" :style="{ color: item.percentualColor }">
          {{ formatPercentual(item.percentual) }}%
        </p>
      </div>
      <div class="estatistica-chart">
        <svg width="78" height="26" viewBox="0 0 78 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline
            :points="createPolyline(item.sparkline)"
            fill="none"
            stroke="#6D78FF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)

const formatPercentual = (value) =>
  new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value)

const createPolyline = (values = []) => {
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = max - min || 1
  const width = 78
  const height = 26
  const step = width / (values.length - 1 || 1)
  return values
    .map((value, index) => {
      const x = index * step
      const normalized = (value - min) / range
      const y = height - normalized * height
      return `${x},${y}`
    })
    .join(' ')
}
</script>

<style scoped>
.estatisticas-mobile-card {
  background: #ffffff;
  border-radius: 28px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  padding: 1rem 1.25rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.5rem;
}

.estatistica-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0.35rem;
}

.estatistica-row-border {
  border-bottom: 1px solid #eceef7;
}

.estatistica-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.estatistica-title {
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #7a7f89;
}

.estatistica-value {
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #151922;
}

.estatistica-percent {
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
}

.estatistica-chart {
  width: 78px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>

