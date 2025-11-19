<template>
  <div class="statistics-card">
    <div class="card-header">
      <div class="title-group">
        <h3 class="card-title">{{ titulo }}</h3>
        <BadgeOrange v-if="showBadge" />
      </div>
      <div class="percent-icon">
        <span class="percent-symbol">%</span>
      </div>
    </div>
    <div class="card-value">R$ {{ formatCurrency(valor) }}</div>
    <div class="divider"></div>
    <div class="card-details">
      <span class="charges">{{ cobrancas }} cobranças</span>
      <span class="percentage">{{ formatPercentual(percentual) }}%</span>
    </div>
  </div>
</template>

<script setup>
import BadgeOrange from './BadgeOrange.vue'

defineProps({
  titulo: {
    type: String,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  cobrancas: {
    type: Number,
    required: true
  },
  percentual: {
    type: Number,
    required: true
  },
  showBadge: {
    type: Boolean,
    default: false
  }
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
</script>

<style scoped>
.statistics-card {
  background: white;
  width: 100%;
  max-width: 420px;
  border-radius: 12px;
  border: 1px solid #EEEEEE;
  padding: 1.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.card-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0%;
  color: #2A2E33;
  margin: 0;
}

.percent-icon {
  width: 46px;
  height: 46px;
  border-radius: 250px;
  border: 1px solid #D9D9D9;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 6px;
  box-sizing: border-box;
}

.percent-symbol {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #2A2E33;
}

.card-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #2A2E33;
  margin-bottom: 1rem;
  line-height: 1;
  flex-shrink: 0;
}

.divider {
  width: calc(100% + 3rem);
  height: 1px;
  background-color: #EEEEEE;
  margin-bottom: 1rem;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  border: none;
  flex-shrink: 0;
}

.card-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  margin-top: auto;
}

.charges {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  line-height: 140%;
  letter-spacing: 0%;
  color: #2A2E33;
}

.percentage {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  line-height: 140%;
  letter-spacing: 0%;
  text-align: right;
  color: #2A2E33;
}
</style>

