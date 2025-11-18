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
        <div class="estatistica-percent-row">
          <p class="estatistica-percent" :style="{ color: item.percentualColor }">
            {{ formatPercentual(item.percentual) }}%
          </p>
          <SparklineChart :data="item.sparkline" />
        </div>
      </div>
    
    </div>
  </div>
</template>

<script setup>
import SparklineChart from './SparklineChart.vue'

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
</script>

<style scoped>
.estatisticas-mobile-card {
  width: 392px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  padding: 1rem 1.25rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.5rem;
  row-gap: 0.25rem;
}

.estatistica-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.4rem 0.35rem;
}

.estatistica-row-border {
  border-bottom: 1px solid #eceef7;
}

.estatistica-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.estatistica-title {
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #7a7f89;
  line-height: 1.1;
}

.estatistica-value {
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #151922;
  line-height: 1.1;
  white-space: nowrap;
}

.estatistica-percent-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.estatistica-percent {
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.1;
  flex-shrink: 0;
}

</style>

